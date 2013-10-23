# Sample Project

When you have [setup your new project](docs/1-Getting-Started.md#installation) correctly, you can directly coding some HTML, CSS, JavaScript & Markdown files.
You should already have your first page open in your browser.

## Note for Git user

If you are working with git (we hope so), you should create a `.gitignore` file with the following

    # cache
    .DS_Store
    .sass-cache

    # packages
    node_modules
    bower_components

    # build
    dist
    build

    # gh-page
    .grunt

## My first `index.html

You can override default `src/index.html`

    ---
    layout: default
    title: Home
    ---
    <h1>My first Index with happyplan \o/</h1>

When you will save this file, you should get the result in you browser in a second.

## My first Stylesheet

Create a file `src/_styles/BLAH.scss`. 

Update your `happyplan.json` file with the configuration below. 
Note the `.scss` extension for the source and `.css` for the destination.

```json
{
  "assets": {
    "styles": [{
      "src": "<%= happyplan.path.assets.styles %>/BLAH.scss",
      "dest": "<%= happyplan.path.dist.assets.styles %>/BLAH.css"
    }]
  }
}
```

Now `BLAH.css` should be loaded into your layout.

## My first JavaScript

Create a file `src/_scripts/BLAH.js` & edit `assets` section

```json
{
  "assets": {
    "styles": [{
      "src": "<%= happyplan.path.assets.styles %>/BLAH.scss",
      "dest": "<%= happyplan.path.dist.assets.styles %>/BLAH.css"
    }],
    "scripts": [{
      "src": [
        "<%= happyplan.path.assets.scripts %>/BLAH.js"
      ],
      "dest": "<%= happyplan.path.dist.assets.scripts %>/BLAH.js"
    }]
  }
}
```

Now `BLAH.js` should be loaded into your layout.
You can add multiple files into the `src` array (eg: `<%= happyplan.bower_components %>/COMPONENT/file.js`)
