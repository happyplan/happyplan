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

### Style Engine (CSS)

For now, only Compass is supported via [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass), but we plan to add other simpler things like [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) or the faster [grunt-sass](https://github.com/sindresorhus/grunt-sass) based on [node-sass](https://github.com/andrew/node-sass) ([libsass](https://github.com/hcatlin/libsass)).

#### Compass

If you need/want to add some sass or compass plugins and/or add bower_components folder, here is what you can do.

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

### Script Engine (JavaScript)

For now, we just concat (for dev) or uglify (for dist) scripts.

### Consuming Bower components

#### Styles

`_bower_components` path is for now added into Compass `additional_import_paths._`
If you want to consume CSS, you can just import theme as regular Sass files (a task is just making copy of each `.css` to `.scss`).

#### Scripts

Here is a simple example that will produce 2 scripts, one called `ieshim.js` that will need to be included by hand in your layout, the other `vanilla.js` should already be included since it's the `assets.main.script`.
This one include some bower component + the `vanilla.js` from your local theme.

```json
{
    "assets": {
        "main": {
            "script": "vanilla.js"
        },
        "scripts": {
            "<%= happyplan.dist.assets.scripts %>/ieshim.js": [
                "<%= happyplan.bower_components %>/aight/aight.js"
            ],
            "<%= happyplan.dist.assets.scripts %>/<%= happyplan.assets.main.script %>": [
                "<%= happyplan.bower_components %>/picturefill/external/matchmedia.js",
                "<%= happyplan.bower_components %>/picturefill/picturefill.js",
                "<%= happyplan.theme.local.assets.scripts %>/<%= happyplan.assets.main.script %>"
            ]
        }
    }
}
```

[defaultconf]: https://github.com/happyplan/happyplan/blob/master/happyplan.json "default config"