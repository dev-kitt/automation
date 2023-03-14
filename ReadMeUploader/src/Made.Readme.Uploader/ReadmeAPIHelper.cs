using System.Net;
using Newtonsoft.Json;
using Silvergate.Readme.Uploader.Models;

namespace Silvergate.Readme.Uploader
{
    public class ReadmeAPIHelper
    {
        private readonly HttpClient _client;
        public ReadmeAPIHelper(HttpClient client)
        {
            _client = client;
        }

        public async Task CreateDocumentAsync(StringContent content)
        {
            var msg = await _client.PostAsync($"docs", content);
            
            if (!msg.IsSuccessStatusCode)
            {
                var errorBody = await msg.Content.ReadAsStringAsync();
                throw new ArgumentException($"Error in creating blog post: {errorBody}");
            }

            System.Console.WriteLine($"{msg.StatusCode}: {msg.Content}");
        }
        
        public async Task UpdateDocumentAsync(StringContent content, string slug)
        {
            var msg = await _client.PutAsync($"docs/{slug}", content);

            if (!msg.IsSuccessStatusCode)
            {
                var errorBody = await msg.Content.ReadAsStringAsync();
                throw new ArgumentException($"Error in updating blog post: {errorBody}");
            }

            System.Console.WriteLine($"{msg.StatusCode}: {msg.Content}");
        }

        public async Task DeleteDocumentAsync(string slug)
        {
            var msg = await _client.DeleteAsync($"docs/{slug}");
            
            if (!msg.IsSuccessStatusCode)
            {
                var errorBody = await msg.Content.ReadAsStringAsync();
                throw new ArgumentException($"Error in deleting blog post: {errorBody}");
            }

            Console.WriteLine($"{msg.StatusCode}: {msg.Content}");
        }


        public async Task<Category?> GetCategoryAsync(string categoryName)
        {
            var msg = await _client.GetAsync($"categories?perPage=10&page=1");
            
            if (!msg.IsSuccessStatusCode)
            {
                var errors = await msg.Content.ReadAsStringAsync();
                throw new ArgumentException($"Could not retrieve categories: {errors}");
            }
            
            List<Category>? categories = JsonConvert.DeserializeObject<List<Category>>(await msg.Content.ReadAsStringAsync());
            Category? category = categories?.Where(c => string.Equals(c.Title, categoryName, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
            return category;
        }

        public async Task<List<CategoryDocumentResponse>> GetDocumentsByCategoryAsync(string slug)
        {
            var msg = await _client.GetAsync($"categories/{slug}/docs");

            if (msg.StatusCode == HttpStatusCode.NotFound)
            {
                return new();
            }
            else if (!msg.IsSuccessStatusCode)
            {
                var errors = await msg.Content.ReadAsStringAsync();
                throw new ArgumentException($"Could not get documents by category: {errors}");
            }
            
            string? body = await msg.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<List<CategoryDocumentResponse>>(body) ?? new();
        }
    }
}