# Configuring Project

**Note: Each time you will change `happyplan.json` you will need to restart `happyplan` command to get updated configuration.**

## Arborescence

Here is what the tree you should have with default configuration (files are ordered manually for doc purpose):

```
    ├── node_modules               // (Happyplan is in that)
    ├── bower_components           // Bower components if you need
    ├── grunt_tasks                // Custom task or override
    │   └── config                 // Custom task config or override
    ├── src
    │   ├── _layouts               // html layouts for your documents
    │   ├── _partials              // Partials pieces
    │   ├── _posts                 // Posts for blog
    │   │   └── _drafts            // Posts you don't want to publish
    │   ├── assets                 // All about design
    │   │   ├── _glyphicons        // Svg icons to be served as webfont
    │   │   ├── _images            // Design images
    │   │   ├── _scripts           // JS
    │   │   │   └── script.js      // a JS file
    │   │   ├── _styles            // CSS
    │   │   │   ├── _icons.scss    // Used if you use grunt-webfont
    │   │   │   └── style.scss     // Where you put all your styles
    │   │   └── fonts              // Fonts
    │   └── media                  // Media for your documents
    ├── dist                       // => App ready to be distributed
    ├── build                      // magic folder you can ignore
    ├── bower.json                 // bower config
    ├── happyplan.json             // Happyplan config !
    ├── package.json               // required by NPM
    └── README.md                  // Everyone should have a README !
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

`/!\` You should know that under Jekyll files (layouts, pages or posts), the entire happyplan configuration is accessible using `site.happyplan`.
Eg: `{{ site.happyplan.version }}` or `{{ site.happyplan.cachebuster }}` can be used everywhere you need it.

__Notice: with the default happyplan command `happyplan` used for development, `drafts` & `future` options of Jekyll are set to `true`__. Obviously you can override that behavior from your configuration.

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
      "dest": "<%= happyplan.path.dist.assets.{{ type }} %>/finalname.ext",
      "hook": "head_open|head_close|head_before_stylesheets|head_stylesheets|head_after_stylesheets|body_open|body_close"
      "ifIE": true|"lt IE 9"|"whatever combo you need"
    }]
  }
}
```

Each objects in the array should at least contains `dest` property.
It's used for automatic inclusion into html hooks (eg: to include jQuery from a CDN).
_Note: `happyplan.path.dist.assets.*` paths used in `dest` key will be automatically adjusted with appropriate base url._

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
        "<%= happyplan.path.assets.scripts %>/script.js"
      ],
      "dest": "<%= happyplan.path.dist.assets.scripts %>/script.js"
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
      "dest": "<%= happyplan.path.dist.assets.scripts %>/respond.js",
      "IEcond": "lt IE 9",
      "hook": "head_after_stylesheets"
    }, {
      "dest": "http://code.jquery.com/jquery-git2.js"
    }, {
      "src": [
        "<%= happyplan.bower_components %>/aight/aight.js"
      ],
      "dest": "<%= happyplan.path.dist.assets.scripts %>/ieshim.js",
      "IEcond": "lt IE 9"
    }, {
      "src": [
        "<%= happyplan.bower_components %>/picturefill/picturefill.js",
        "<%= happyplan.path.assets.scripts %>/script.js"
      ],
      "dest": "<%= happyplan.path.dist.assets.scripts %>/script.js"
    }]
  }
}
```

### Style Engine (CSS)

To avoid a Ruby dependency & keep build fast, we decide to use Sass based on [libsass](https://github.com/hcatlin/libsass) but you will be able to use whatever you want by [configuring your own task (soon)](https://github.com/happyplan/happyplan/issues/80)

#### Sass

By default, only `bower_components` is added as an include path, but you can override that in your `happyplan.json`:

```json
{
  "sass": {
    "includePaths": [
      "<%= happyplan.bower_components %>",
      "one_more_path"
    ]
  }
}
```

If you want to add a stylesheet easily you just need to add an item to the `happyplan.assets.styles` array.
**Here is what is done by default:**

```json
{
  "assets": {
    "styles": [{
      "src": "<%= happyplan.path.assets.styles %>/<%= happyplan.name %>.scss",
      "dest": "<%= happyplan.path.dist.assets.styles %>/<%= happyplan.name %>.css"
    }]
  }
}
```

For a more solid examples, please refer to the section `Script Engine` above.

#### Custom styles engine example: Styl

Enjoy the power of happyplan & override style task with what you want !
We wrote a simple example using [Styl](https://github.com/visionmedia/styl) a flexible & solid alternative to Sass.
You can see it with the [test `override_task`](https://github.com/happyplan/happyplan/tree/master/test/features/override_task).
This example can be adapted easily to **Less** or something else if you really want to use it :).

### Glyphicons

The concept is simple: you can drop .svg files in the `_glyphicons` folder & all of them will be "compiled" into a webfont.
This will create all files format to be compatible with old browsers & also create a `_icons.scss` in the `src/assets/_styles` folder.
This CSS file will contain a class for each svg.
Eg: you've put `home.svg`, so `icon_home` class will be accessible.

To use webfont icons directly in your html, you need to be sure that `_icons.scss` is included in your stylesheet & use appropriate html classes.
Ex: `<i class="icon icon_home"></i>` (here `<i>` is just used because it's shorter, you can obviously use whatever you want).

### Images

You can put whatever you want in the default `src/assets/_images` folder, but you need to know that by default, some file formats will be ignored to make the build lighter. Here is the default configuration.

```json
{
  "assets": {
    "images": {
      "src": [
        "**",
        "!**/*.ai",
        "!**/*.eps",
        "!**/*.pdf",
        "!**/*.pxm",
        "!**/*.psd",
        "!**/*.raw",
        "!**/*.xcf"
      ]
    }
  }
}
```

If you are not confortable with this settings you can changes everything, and for example just take the opposite approche and specify file formats you want :

```json
{
  "assets": {
    "images": {
      "src": [
        "**/*.BMP",
        "**/*.gif",
        "**/*.jpg",
        "**/*.jpeg",
        "**/*.png",
        "**/*.webp"
      ]
    }
  }
}
```

#### Optimization

Every images that can be optimized will be (when using `dist` task or `--env=dist`).
This include .jpeg & .png files.
To change default option below, just take a look to the [`imagemin` task](https://github.com/gruntjs/grunt-contrib-imagemin#imagemin-task) options.

```json
{
  "imagemin": {
    "optimizationLevel": 3,
    "progressive": true
  }
}
```

## Override tasks / Custom tasks

Enjoy the power of happyplan & override whatever you want !
You can see a simple example of an override of the style engine with the [test `override_task`](https://github.com/happyplan/happyplan/tree/master/test/features/override_task).
_This example can be adapted easily override whatever you want or need._
You should even be able to plug custom tasks very easily !

The idea is that you can create a `grunt_tasks` & override/add tasks respecting original happyplan worflow.
You can even change predefined tasks config in `grunt_tasks/config`.

[defaultconf]: https://github.com/happyplan/happyplan/blob/master/happyplan.json "default config"
