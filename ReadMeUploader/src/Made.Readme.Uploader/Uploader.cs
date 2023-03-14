using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using Made.Readme.Uploader.Models;

namespace Made.Readme.Uploader
{
    public class Uploader
    {
        private readonly string _apiKey;
        private readonly string _category;
        private readonly string _directory;
        private readonly Mapper _mapper;
        private readonly ReadmeAPIHelper _readmeAPIHelper;
        const int MAX_TRIES = 50;

        public Uploader(Options options)
        {
            _apiKey = options.ApiKey;
            _category = options.Category;
            _directory = options.Directory;
            string version = options.Version;

            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<BlogPost, Document>();
                cfg.CreateMap<BlogPost, BaseDocument>();
            });
            _mapper = new Mapper(config);
            _readmeAPIHelper = new(InitializeHttpClient(version));
        }

        private HttpClient InitializeHttpClient(string version)
        {
            var client = new HttpClient
            {
                BaseAddress = new Uri("https://dash.readme.com/api/v1/")
            };
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", _apiKey);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("x-readme-version", version);
            return client;
        }

        public async Task RunAsync()
        {
            Console.WriteLine("Running...");
            if (!Directory.Exists(_directory))
            {
                throw new ArgumentException($"Could not find directory {_directory}");
            }

            string blogFile = $"{_directory}/blogs.json";
            if (!File.Exists(blogFile))
            {
                throw new ArgumentException($"Could not find manifest file at {blogFile}");
            }

            Category? category = await _readmeAPIHelper.GetCategoryAsync(_category);
            if (category == null)
            {
                throw new ArgumentException($"Could not find category {_category}");
            }

            List<BlogPost>? blogPosts = JsonConvert.DeserializeObject<List<BlogPost>>(await File.ReadAllTextAsync(blogFile));
            if (blogPosts == null)
            {
                throw new NullReferenceException($"Parsing blogs from {blogFile} failed, confirm formatting is correct and try again");
            }

            // Delete All Documents that currently exist in readme category but are not defined in the blogs
            await HouseKeepingAsync(category, blogPosts);

            await PopulateBlogPostsAsync(category, blogPosts);

            Dictionary<string, string?> parentIds = await CreateParentDocumentsAsync(category, blogPosts);

            foreach (var blogPost in blogPosts.Where(bp => !bp.IsParent))
            {
                // Publish remaining documents
                PopulateBlogWithParentId(parentIds, blogPost);

                await CreateOrUpdateDocumentAsync(blogPost, category);
            }
        }

        private async Task HouseKeepingAsync(Category category, List<BlogPost> blogPosts)
        {
            if (string.IsNullOrWhiteSpace(category.Slug))
            {
                throw new NullReferenceException($"Category {_category} is missing a slug");
            }

            List<CategoryDocumentResponse>? existingDocuments = await _readmeAPIHelper.GetDocumentsByCategoryAsync(category.Slug);
            foreach (var existingDoc in existingDocuments)
            {
                bool isUndefinedDocument = !blogPosts.Select(bp => bp.Title).Contains(existingDoc.Title);
                // first delete any children that are undefined in blogs or delete all if parent does not exist
                if (existingDoc.Children != null && existingDoc.Children.Any())
                {
                    foreach (var childDoc in existingDoc.Children)
                    {
                        if (isUndefinedDocument // Parent is undefined, delete all children
                            || !blogPosts.Select(bp => bp.Title).Contains(childDoc.Title) // Delete undefined child document
                            || (blogPosts.FirstOrDefault(bp => bp.Title == childDoc.Title)?.IsParent == true)) // Delete if existing child is defined as a parent
                        {
                            System.Console.WriteLine($"Deleting child document {childDoc.Title}");
                            await _readmeAPIHelper.DeleteDocumentAsync(childDoc.Slug);
                        }
                    }

                    if (isUndefinedDocument)
                    {
                        bool childrenStillExist = true;
                        int iteration = 0;
                        while (childrenStillExist)
                        {
                            if (iteration++ >= MAX_TRIES)
                            {
                                throw new TimeoutException($"Timed out confirming children of {existingDoc.Title} were removed");
                            }
                            List<CategoryDocumentResponse>? allCurrentDocuments = await _readmeAPIHelper.GetDocumentsByCategoryAsync(category.Slug);
                            childrenStillExist = allCurrentDocuments.FirstOrDefault(acd => acd.Id.Equals(existingDoc.Id))?.Children?.Any() == true;
                            if (childrenStillExist)
                            {
                                await Task.Delay(3000);
                            }
                        }
                    }
                }
                if (isUndefinedDocument)
                {
                    System.Console.WriteLine($"Deleting undefined document {existingDoc.Title}");
                    await _readmeAPIHelper.DeleteDocumentAsync(existingDoc.Slug);
                }
            }
        }

        private async Task PopulateBlogPostsAsync(Category category, List<BlogPost> blogPosts)
        {
            foreach (var blogPost in blogPosts)
            {
                blogPost.Type = "basic";
                blogPost.Category = category.Id;
                if (!string.IsNullOrWhiteSpace(blogPost.File))
                {
                    var fileName = $"{_directory}/{blogPost.File}";
                    if (!File.Exists(fileName))
                    {
                        throw new ArgumentException($"Could not find file {fileName} for blog with title {blogPost.Title}. Please correct and run again.");
                    }
                    blogPost.Body = await File.ReadAllTextAsync(fileName);
                }
            }
        }

        private async Task<Dictionary<string, string?>> CreateParentDocumentsAsync(Category category, List<BlogPost> blogPosts)
        {
            Dictionary<string, string?> parentIds = new Dictionary<string, string?>();
            foreach (var blogPost in blogPosts.Where(bp => bp.IsParent))
            {
                // Create/Update Parent documents first and create entry to store its ID
                parentIds.Add(blogPost.Title, null);
                await CreateOrUpdateDocumentAsync(blogPost, category);
            }

            bool IsIdNotInitialized = true;
            int iteration = 0;
            while (IsIdNotInitialized) // Retrieve IDs of parent documents
            {
                if (iteration++ >= MAX_TRIES)
                {
                    throw new TimeoutException("Timed out retrieving parent ids");
                }

                IsIdNotInitialized = false;
                foreach (var parentKeyVal in parentIds)
                {
                    if (string.IsNullOrWhiteSpace(parentKeyVal.Value))
                    {
                        IEnumerable<BaseCategoryDocumentResponse> allDocs = await AllAvailableDocumentsFlatAsync(category);
                        parentIds[parentKeyVal.Key] = allDocs.FirstOrDefault(d => d.Title.Equals(parentKeyVal.Key, StringComparison.InvariantCultureIgnoreCase))?.Id;
                        if (string.IsNullOrWhiteSpace(parentIds[parentKeyVal.Key]))
                        {
                            IsIdNotInitialized = true;
                        }
                        else
                        {
                            System.Console.WriteLine($"{parentKeyVal.Key} id retrieved and stored.");
                        }
                    }
                }
                if (IsIdNotInitialized)
                {
                    await Task.Delay(3000);
                }
            }

            System.Console.WriteLine($"All Parents created and ids retrieved and stored.");

            return parentIds;
        }

        private static void PopulateBlogWithParentId(Dictionary<string, string?> parentIds, BlogPost blogPost)
        {
            if (!string.IsNullOrWhiteSpace(blogPost.ParentDoc)) // Populate blogs parent documents ID
            {
                System.Console.WriteLine($"{blogPost.Title} has Parent ID: {parentIds[blogPost.ParentDoc]}");
                if (!parentIds.ContainsKey(blogPost.ParentDoc))
                {
                    throw new ArgumentException($"Parent {blogPost.ParentDoc} is not defined for blog with title {blogPost.Title}. Please define parent or remove parentDoc and run again.");
                }
                blogPost.ParentDoc = parentIds[blogPost.ParentDoc];
            }
        }

        public async Task CreateOrUpdateDocumentAsync(BlogPost blogPost, Category category)
        {
            if (string.IsNullOrWhiteSpace(blogPost.Title))
            {
                throw new NullReferenceException($"Blog {blogPost.ToString} is missing a title");
            }

            IEnumerable<BaseCategoryDocumentResponse> allDocs = await AllAvailableDocumentsFlatAsync(category);
            var blogSlug = allDocs.FirstOrDefault(d => d.Title.Equals(blogPost.Title, StringComparison.InvariantCultureIgnoreCase))?.Slug;
            var camelSettings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            StringContent content;
            if (string.IsNullOrWhiteSpace(blogPost.Body))
                content = new StringContent(JsonConvert.SerializeObject(_mapper.Map<BaseDocument>(blogPost), camelSettings), Encoding.UTF8, "application/json");
            else
                content = new StringContent(JsonConvert.SerializeObject(_mapper.Map<Document>(blogPost), camelSettings), Encoding.UTF8, "application/json");

            if (string.IsNullOrWhiteSpace(blogSlug))
            {
                Console.WriteLine($"Creating blog with title {blogPost.Title}");
                await _readmeAPIHelper.CreateDocumentAsync(content);
            }
            else
            {
                Console.WriteLine($"Updating blog with title {blogPost.Title}");
                await _readmeAPIHelper.UpdateDocumentAsync(content, blogSlug);
            }
        }

        private async Task<IEnumerable<BaseCategoryDocumentResponse>> AllAvailableDocumentsFlatAsync(Category category)
        {
            if (string.IsNullOrWhiteSpace(category.Slug))
            {
                throw new NullReferenceException($"Category {category.Title} is missing slug .");
            }

            var existingDocs = await _readmeAPIHelper.GetDocumentsByCategoryAsync(category.Slug);
            IEnumerable<BaseCategoryDocumentResponse> flattenResponse = existingDocs.SelectMany(ed =>
            {
                var docs = new List<BaseCategoryDocumentResponse> { ed };
                if (ed.Children != null && ed.Children.Any())
                {
                    docs.AddRange(ed.Children);
                }
                return docs;
            });
            return flattenResponse;
        }
    }
}