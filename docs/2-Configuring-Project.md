# Configuring Project

## Arborescence

Here is what all you can get using happyplan :

```
    ├── assets                      // All about design
    │   ├── _glyphicons             // Svg icons to be served as webfont
    │   ├── _images                 // Design images
    │   ├── _scripts                // JS
    │   │   └── script.js           // a JS file
    │   ├── _styles                 // CSS
    │   │   ├── _font-icons.scss    // Used if you use grunt-webfont (svg-to-font tool), do not edit it
    │   │   └── style.scss          // Where you put all your styles
    │   ├── _glyphicons             // SVG transformed into fonts
    │   └── fonts                   // Fonts
    ├── bower_components            // Bower components
    ├── build                       // Where some magic to build you app happen
    ├── dist                        // App ready to be distributed
    ├── layouts                     // html layouts for your documents
    ├── media                       // Media for your documents
    ├── node_modules                // (Happyplan is in that)
    ├── pages                       // Your documents (mainly html pages) that will be at the root of your app
    ├── partials                    // Partials pieces of documents you cna reuse (= jekyll _includes folder)
    ├── posts                       // Posts for blog
    │   └── _drafts                 // Posts you don't want to publish
    ├── bower.json                  // Where you define your options used by bower
    ├── happyplan.json              // You can create this file to override the default config.
    ├── package.json                // NPM file where reference to happyplan is keep
    └── README.md                   // Everyone should have a README right ? :)
```

## Configuration

To override the default configuration [`happyplan.json`][defaultconf] you can create a `happyplan.json` at the root. Both will be **deeply merged** together.

_We encourage you to take a look to the [default configuration][defaultconf] before playing with it._

As you can see in the [default configuration][defaultconf], _you can change every paths you want_. If you are not happy with basepath, just replace value at the top level (`"_"`).
Just be sure to be careful when you play with that :)

By default, to configure tools used under the hood, there is a json dedicated section. You should be able to place any native parameters here of the tool in it.
_You can omit anything related to the paths in favor of the specific configuration section._
Whenever it's possible, we will use simple json to whatever is needed conversion to suit the tool requirement.

### Document Engine (HTML)

For now, only Jekyll is supported to render html & markdown.
But we are open to alternatives or suggestion [[+](https://github.com/happyplan/happyplan/issues/45)];

#### Jekyll

`jekyll` configuration section will be used converted into YML for Jekyll build (using [`js-yaml`](https://github.com/nodeca/js-yaml)).

For example, if you want to enhance Jekyll, you can use the following snippet that will:

```json
{
    "jekyll": {
        "include": [".htaccess"],
        "markdown": "redcarpet",
        "any other data": "that jekyll will be able to use"
    }
}
```

### Assets

**By default, _only one stylesheet_ is included automatically**

Here is currently the kind of assets recognized.

* Scripts
* Styles
* Images
* Glyphicons (svg icons transformed as a web font)
* Fonts

Scripts & styles have some specials treatments & they can be automatically included in your html layout if you use `happyplan.assets.scripts` & `happyplan.assets.styles` array with appropriate items like this (replace `{{ type }}` by `scripts` or `styles`).

```json
{
  "assets": {
    "{{ type }}": [{
      "src": [
        "source-1.ext",
        "source-2.ext"
      ],
      "dest": "<%= happyplan.dist.assets.{{ type }} %>/finalname.ext",
      "hook": "head_open|head_close|head_before_stylesheets|head_stylesheets|head_after_stylesheets|body_open|body_close"
      "ifIE": true|"lt IE 9"|"whatever combo you need"
    }]
  }
}
```

Each objects in the array should at least contains `dest` property.
It's used for automatic inclusion into html hooks (eg: to include jQuery from a CDN).
_Note: `happyplan.dist.assets.*` paths used in `dest` key will be automatically adjusted with appropriate base url._

#### Cache-buster

> A cache-buster is a unique piece of code that prevents a browser from reusing something it has already downloaded and cached.

For us, the cache-buster is a value (`happyplan.cachebuster`) that can be used to _force_ some statics files to be updated by browsers when you publish a new version of your website.
By default, our cache-buster is just a date `"<%= grunt.template.today('yyyymmddHHMMss') %>"`, but you can change it to something like the version of you website like this:

```json
{
  "cachebuster": "<%= happyplan.version %>"
}
```

Obviously, you can just put whatever you want into the template.

For now, it's used for stylesheets (links href) & scripts (src) when using `--env=dist` option.
You can disable it by just setting it to `false`.
It's prepended at the end after `?`.

#### Hooks

Hooks are used to attach script or stylesheet (or something else) automatically in some place of your layout (see example above).

Here are default hooks that can be overrided:

```json
{
  "assets": {
    "default_hook": {
      "styles": "head_stylesheets",
      "scripts": "body_close"
    }
  }
}
``` 

#### Script Engine (JavaScript)

_For now, we just concat (for dev) or uglify (for dist) scripts._

If you want to add a script easily you just need to add an item to the `happyplan.assets.scripts` array.

```json
{
  "assets": {
    "scripts": [{
      "src": [
        "<%= happyplan.theme.local.assets.scripts %>/script.js"
      ],
      "dest": "<%= happyplan.dist.assets.scripts %>/script.js"
    }]
  }
}
```

Here is a solid example that show you how to includes lots scripts using differents placements:

```json
{
  "assets": {
    "scripts": [{
      "src": [
        "<%= happyplan.bower_components %>/Respond/respond.src.js"
      ],
      "dest": "<%= happyplan.dist.assets.scripts %>/respond.js",
      "IEcond": "lt IE 9",
      "hook": "head_after_stylesheets"
    }, {
      "dest": "http://code.jquery.com/jquery-git2.js"
    }, {
      "src": [
        "<%= happyplan.bower_components %>/aight/aight.js"
      ],
      "dest": "<%= happyplan.dist.assets.scripts %>/ieshim.js",
      "IEcond": "lt IE 9"
    }, {
      "src": [
        "<%= happyplan.bower_components %>/picturefill/picturefill.js",
        "<%= happyplan.theme.local.assets.scripts %>/script.js"
      ],
      "dest": "<%= happyplan.dist.assets.scripts %>/script.js"
    }]
  }
}
```

### Style Engine (CSS)

For now, only Compass is supported via [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass), but we plan to add other simpler things like [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) or the faster [grunt-sass](https://github.com/sindresorhus/grunt-sass) based on [node-sass](https://github.com/andrew/node-sass) ([libsass](https://github.com/hcatlin/libsass)).

#### Compass

`_bower_components` path is added into Compass `additional_import_paths._`
If you want to consume normal CSS in your Scss, you can just import theme as regular Sass files (a task is just making copy of each `.css` to `.scss`).

If you need/want to add some Sass or Compass plugins and/or add `bower_components` folder, here is what you can do.

```json
{
    "compass": {
        "require": [
            "ceaser-easing"
        ],
        "additional_import_paths": [
            "<%= happyplan.bower_components %>/griddle"
        ]
    }
}
```

[defaultconf]: https://github.com/happyplan/happyplan/blob/master/happyplan.json "default config"