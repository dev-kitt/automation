using System;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using CommandLine;
using CommandLine.Text;

namespace Made.Readme.Uploader
{
    public class Options
    {
        [Option('k', "key", Required = true, HelpText = "Set API Key for uploading documentation")]
        public string ApiKey { get; set; } = string.Empty;
        [Option('c', "category", Required = true, HelpText = "Select the category that you want to use when uploading the documentation")]
        public string Category { get; set; } = string.Empty;

        [Option('v', "version", Required = true,
            HelpText = "Select the version (i.e. v3) that you want the documentation to be put under")]
        public string Version { get; set; } = string.Empty;
        [Option('d', "dir", Required = true, HelpText = "Directory in which the markdown files should be read from, including the manifest file")]
        public string Directory { get; set; } = string.Empty;

    }
    class Program
    {
        static async Task<int> Main(string[] args)
        {
            var options = CommandLine.Parser.Default.ParseArguments<Options>(args).Value;
            Uploader uploader = new Uploader(options);
            try
            {
                await uploader.RunAsync();
                return 0;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return -1;
            }
        }

        static void HandleParseError(IEnumerable<Error> errors)
        {
            foreach (var error in errors)
            {
                Console.WriteLine($"Error: {error}");
            }
        }
    }
}