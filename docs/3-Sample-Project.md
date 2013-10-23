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

You can override default `src/index.html.hbs`

    ---
    layout: default.hbs
    title: My first Index with happyplan \o/
    ---
    <h1>{{ this.title }}</h1>

    {{#markdown}}
    This will create a html _paragraphe_ for you,
    enhanced by [Markdown](http://en.wikipedia.org/wiki/Markdown)

    Hey checkout this photo of me ![me, naked]({{ happyplan.baseUrls.media }}/me-naked.jpg)
    {{/markdown}}

    <footer><img alt="" src="{{ happyplan.baseUrls.images }}/hr.png" />

### Variables

When you will save this file, you should get the result in you browser in a second.
Oh wait, you will see that 2 files are missing !

You just need to add yourself naked in `src/media/me-naked.jpg`,
& the awesome asset image to replace html `<hr />` in `src/assets/_images/hr.png`.
Boom it should work better now. And now you know how to use happyplan variables ;)

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
