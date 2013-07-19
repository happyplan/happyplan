# Happy Plan! [![Build Status](https://travis-ci.org/happyplan/happyplan.png?branch=master)](https://travis-ci.org/happyplan/happyplan)

<img align="right" src="https://raw.github.com/happyplan/happyplan/master/logo.png" />

> When Grunt.js uses Jekyll as a peon.

Happy plan is a static website generator based on a bundle of amazing tools.
It's just all about fun.

### What in it?

* A static website generator from html or markdown: [Jekyll](http://jekyllrb.com/).
* A task-based command line build tool: [Grunt.js](http://gruntjs.com/) & all pre-defined tasks you'll need (scripts, styles & images automatic minification & compression).
* An amazing CSS pre-processor, [Sass](http://sass-lang.com/) directly served with [Compass](http://compass-style.org/).
* A quick way to provide scalable icons as font thanks an awesome Grunt task [grunt-webfont](https://github.com/sapegin/grunt-webfont).
* A [Livereload](http://livereload.com/) server ([tiny-lr](https://github.com/mklabs/tiny-lr) provided by the [grunt-contrib-livereload](https://github.com/gruntjs/grunt-contrib-livereload) task) to make development as fast as hell.
* Support the [Bower](http://bower.io/) package manager to handle web components.

Oh, by the way, why "happy plan" ? [Here is not the answer](http://www.youtube.com/watch?v=5zVVKXT8Vi0).

## TL;DR
According you already have Ruby and NPM installed.

```bash
gem install jekyll compass
npm install -g grunt-cli bower-canary happyplan-cli
npm install happyplan --save-dev
happyplan
```

## Requirements

### Jekyll [[+](https://github.com/mojombo/jekyll/wiki/install)]

    $ (sudo) gem install jekyll

### Compass [[+](http://compass-style.org/install/)]

    $ (sudo) gem install compass

### Node.js [[+](https://github.com/joyent/node/wiki/Installation)]

    $ brew install node

#### Npm [[+](https://github.com/isaacs/npm)]

    $ curl http://npmjs.org/install.sh | sh

### Grunt.js (>0.4) [[+](http://gruntjs.com/getting-started)]

    $ npm install -g grunt-cli

### Happy Plan cli

    $ npm install -g happyplan-cli

### Optionals

#### Grunt-Webfont[[+](https://github.com/sapegin/grunt-webfont#installation)]

    $ brew install fontforge ttfautohint
    $ brew install https://raw.github.com/sapegin/grunt-webfont/master/Formula/sfnt2woff.rb

#### Bower [[+](https://github.com/bower/bower#installing-bower)]

    $ npm install -g bower-canary

---

## Installation

When everything above is okay, just run in your project root:

    $ npm install happyplan --save-dev

That's it. Now you can start your website bro'.

## Arborescence

Here is what you can get you will use happyplan :

    ├── assets                      // All about design
    │   ├── _glyphicons             // Svg icons to be served as webfont
    │   ├── _images                 // Design images
    │   ├── _scripts                // JS
    │   │   └── script.js           // a JS file
    │   ├── _styles                 // CSS
    │   │   ├── _font-icons.scss    // Used if you use grunt-webfont (svg-to-font tool), do not edit it
    │   │   └── style.scss          // Where you put all your styles
    │   ├── _glyphicons             // SVG transformed into fonts
    │   └── fonts                   // Fonts
    ├── bower_components            // Bower components
    ├── build                       // Where some magic to build you app happen
    ├── dist                        // App ready to be distributed
    ├── layouts                     // html layouts for your documents
    ├── media                       // Media for your documents
    ├── node_modules                // (Happyplan is in that)
    ├── pages                       // Your documents (mainly html pages) that will be at the root of your app
    ├── partials                    // Partials pieces of documents you cna reuse (= jekyll _includes folder)
    ├── posts                       // Posts for blog
    │   └── _drafts                 // Posts you don't want to publish
    ├── bower.json                  // Where you define your options used by bower
    ├── happyplan.json              // You can create this file to override the default config.
    ├── package.json                // NPM file where reference to happyplan is keep
    └── README.md                   // Everyone should have a README right ? :)

### Configuration

You can create a `happyplan.json` at the root to override the default configuration [`happyplan.json`][defaultconf]. Both will be **deeply merged** together.

_We encourage you to take a look to the [default configuration][defaultconf] before playing with it._

As you can see in the [default configuration][defaultconf], _you can change every paths you want_. If you are not happy with basepath, just replace value at the top level (`"_"`).
Just be sure to be careful when you play with that :)

By default, to configure tools used under the hood, there is a json dedicated section. You should be able to place any native parameters here of the tool in it.
_You can omit anything related to the paths in favor of the specific configuration section._
Whenever it's possible, we will use simple json to whatever is needed conversion to suit the tool requirement.

#### Document Engine (HTML)

For now, only Jekyll is supported to render html & markdown.
But we are open to alternatives or suggestion [[+](https://github.com/happyplan/happyplan/issues/45)];

##### Jeykyll

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

#### Style Engine (CSS)

For now, only Compass is supported via [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass), but we plan to add other simpler things like [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) or the faster [grunt-sass](https://github.com/sindresorhus/grunt-sass) based on [node-sass](https://github.com/andrew/node-sass) ([libsass](https://github.com/hcatlin/libsass)).

##### Compass

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

#### Script Engine (JavaScript)

For now, we just concat (for dev) or uglify (for dist) scripts.

#### Consuming Bower components

##### Styles

_`bower_components` path is for now added into Compass `additional_import_paths`._
If you want to consume CSS, you can just import theme as regular Sass files (a task is just making copy of each `.css` to `.scss`).

##### Scripts

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

---

## Development

You just need to launch default task to start using the watcher that will allow you to test your posts _with livereload started_.

    $ happyplan

This should make a first fresh build, start a static server & the livereload one, then open the appropriate page in your browser.

Now you can start to add/modify assets or posts & save them.
BOOM.
Livreload do the magic & files should be automatically reloaded into your browser.

## Build

To build the website

    $ happyplan dist

## Publish on gh-pages (github)

If you want to publish your build on the gh-pages:

    $ happyplan publish

This script builds the website (happy dist) & commit + push on gh-pages branch.

#### Warning for username.github.com

`username.github.com` is a bit special. Indeed, the `master` branch acts like a `gh-pages` so you have to publish your website on `master` and not `gh-pages` (don't try `gh-pages`, it won't work).

For that, create or modify `happyplan.json` and add this option:

```json
{
    "git": {
        "branch": "master"
    }
}
```

Now you can easily push your website on this branch via `$ happyplan publish`

## Create a new post

    $ happyplan newpost --name="This is a test" --tags="change,me,dude"

This create a new post in your draft folder (`posts/_drafts` by default) if the today date.
For more informations about posts, just read [Jekyll's post documentation](http://jekyllrb.com/docs/posts/)

---

## Theming

Aye, you can theme Happy Plan, great isn't it?

_Just to let you know, everything is a theme for happyplan._
Default files are just the default theme. Local files are just a local theme.
Every theme can have a `happyplan.json` configuration, so this should be very flexible.
Here is how themes are interpreted.

1. Default theme is parsed & loaded.
2. Local theme configuration is parsed.
3. Checking if the local theme use a parent theme.
4. If there is a parent theme, loop from 2. to 4. with it.
5. Load parent theme.
6. Load local theme.

### Theme configuration

Each theme have a section in the `theme` one. Just take a look in the (defaultconf)

### Inheritance

A theme can herit from a parent theme. To do this, just add this section to you configuration:

```json
{
    "theme": {
        "local": {
            "parent": "themename"
        }
    }
}
```

For now `themename` should be a folder accessible in `bower_components` folder.
But if you feel the need, it won't be difficult to make this lookup smarter.

### Install a theme

    $ bower install {themename}

It will download your theme via bower. You can replace `{themename}` bye `user/repo` or whatever Bower can consume.

### Use a theme

For now, just do like the snippet above, changing `theme.local.parent` value.

---

## Contributing

When you want to fix a bug or add a feature, just be sure to get all testing requirements installed, & run tests before making your *Pull Request*.

You can run in one command the build process & the tests.

    $ npm test

In case you don't know it yet, `npm {cmd}` just run the command `{cmd}` specified in the `package.json` `script` section. In our case, it run `grunt test`. And to be precise, the `test` task run the `nodeunit` one.

---

## Release History

Checkout [CHANGELOG](CHANGELOG.md)

---

## Migrations

[Jekyll already have a migration doc](https://github.com/mojombo/jekyll/wiki/blog-migrations)

Note: For Wordpress, [wordpress-to-jekyll-exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter) seems a quick & good choice (+ keep disqus thread id !)

---

## Support

Come up and say hello on [IRC](http://webchat.freenode.net/?channels=happyplan)! We'll be glad to answer you if you have any questions.

    #happyplan @ irc.freenode.net

And folllow us on Twitter too: [@happyplanapp](https://twitter.com/happyplanapp)

## Credits

Thank you [Catherine Please](http://www.catherineplease.com/) for your excellent logo.

## Authors

+ [@kud](https://github.com/kud)
+ [@MoOx](https://github.com/MoOx)

[defaultconf]: https://github.com/happyplan/happyplan/blob/master/happyplan.json "default config"
