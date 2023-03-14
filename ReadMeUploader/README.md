# Usage
Create a folder with any name, inside put all your markdown files as well as a file called `blogs.json`

The format of blogs.json is as follows
```json
[
  {
    "title": "SEN Data and Automated Attribution",
    "file": "sen-data-and-automated-attribution.md",
    "hidden": false,
    "order": -10
  },
  {
    "title": "Another blog",
    "file": "another-blog-file.md",
    "hidden": false,
    "order": -9
  }
]
```

To add a Parent Document for blog structuring add a blog with no "file" defining the parent then and link all blogs that are to be nested as follows
```json
[
  {
    "title": "Parent Document",
    "hidden": false,
    "order": -11
  },
  {
    "title": "SEN Data and Automated Attribution",
    "file": "sen-data-and-automated-attribution.md",
    "hidden": false,
    "order": -10,
    "parentDoc": "Parent Document"
  }
]
```

`title` will become the title that the user will see

`file` is the name of the markdown file to use

`hidden` determines if the blog post is publicly visible

`order` defines the order in which the blog posts show up, API Spec documents start at 0 and increment from there, so using negative numbers will make them appear first. 
## Running the Tool
```bash
Made.Readme.Uploader.exe -k <api-key> -v <api-version> -c <api-category> -d <directory>
```
Where the following parameters are used

`api-key` is the key to authenticate with Readme.io 

`api-version` is the version on Readme that you want to publish blogs under. Example: `v3`

`api-category` the category under which you want to put documentation. Intended to be set to `Documentation Articles`, this will publish the blogs to it's own category for it to maintain. If set to `Documentation` it will publish it as custom pages. If set to `Partner API` it will publish it with the rest of the API spec, highly recommended to NOT do this as Readme-Uploader does clean up documents with the title not defined in blogs.json when it runs (i.e. this will delete the API docs until partner-api runs).

`directory` is the directory in which the `blogs.json` and markdown files live to be uploaded.