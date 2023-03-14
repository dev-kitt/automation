using Newtonsoft.Json;

namespace Made.Readme.Uploader.Models
{
    public class BlogPost
    {
        public string Title { get; set; } = string.Empty;
        public string? File { get; set; }
        public int? Order { get; set; }
        public bool? Hidden { get; set; }
        public string? Body { get; set; }
        public string? Category { get; set; }
        public string? Type { get; set; }
        public string? ParentDoc { get; set;}
        public bool? ShouldSerializeFile => false;
        [JsonIgnore]
        public bool IsParent => string.IsNullOrEmpty(File);
    }
}