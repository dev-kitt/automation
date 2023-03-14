namespace Made.Readme.Uploader.Models
{
    public class BaseDocument
    {
        public string? Title { get; set; }
        public int? Order { get; set; }
        public bool? Hidden { get; set; }
        public string? Category { get; set; }
        public string? Type { get; set; }
    }
}