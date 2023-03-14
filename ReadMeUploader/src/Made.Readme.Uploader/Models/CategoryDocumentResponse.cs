using Newtonsoft.Json;

namespace Made.Readme.Uploader.Models
{
    public class CategoryDocumentResponse : BaseCategoryDocumentResponse
    {
        public CategoryDocumentChildResponse[]? Children { get; set; }
    }

    public class CategoryDocumentChildResponse : BaseCategoryDocumentResponse
    {
    }

    public class BaseCategoryDocumentResponse
    {
        [JsonProperty("_id")]
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public int? Order { get; set; }
        public bool? Hidden { get; set; }
    }
}