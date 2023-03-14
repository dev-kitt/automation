using System;
using Newtonsoft.Json;

namespace Made.Readme.Uploader.Models
{
    public class Category
    {
        public string? Title { get; set; }
        public string? Slug { get; set; }
        public int? Order { get; set; }
        public bool? Reference { get; set; }
        public bool? IsApi { get; set; }
        [JsonProperty("_id")]
        public string? Id { get; set; }
        public string? Version { get; set; }
        public string? Project { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}