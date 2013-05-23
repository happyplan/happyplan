# Happy Plan! [![Build Status](https://travis-ci.org/kud/happy-plan.png?branch=master)](https://travis-ci.org/kud/happy-plan)

<img src="data:image/png;base64,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">

> When Grunt.js uses Jekyll as a peon.

Happy plan is a static website generator based on a bundle of amazing tools . It's just all about fun.

### What in it?

* A static website generator from html or markdown: [Jekyll](https://github.com/mojombo/jekyll).
* A task-based command line build tool: [Grunt.js](http://gruntjs.com/) & some pre-defined tasks (scripts, styles & images automatic minification & compression).
* An amazing CSS pre-processor, [Sass](http://sass-lang.com/) directly served with [Compass](http://compass-style.org/).
* A quick way to provide scalable icons as font thanks an awesome Grunt task [grunt-webfont](https://github.com/sapegin/grunt-webfont).
* A [Livereload](http://livereload.com/) server ([tiny-lr](https://github.com/mklabs/tiny-lr) provided by the [grunt-contrib-livereload](https://github.com/gruntjs/grunt-contrib-livereload) task) to make development as fast as hell.
* A package manager for the web called [Bower](https://github.com/twitter/bower) to handle web components.

Oh, by the way, why "happy plan" ? [Here is not the answer](http://www.youtube.com/watch?v=5zVVKXT8Vi0).

## Arborescence

    .
    ├── bin                             // Some binaries used by happy plan
    │   ├── newpost.js                  // Allows you to create a new post via $ node ./bin/newpost.js
    │   └── publish.sh                  // To publish on gh-pages via $ ./bin/publish.sh
    ├── build                           // Where your app is built but you don't have to care about it
    ├── dist                            // Your final app
    ├── src                             // This is where all comes
    │   ├── _config                     // Everything about config
    │   │   └── config.yml              // Configure jekyll
    │   ├── _layouts                    // Layouts
    │   │   ├── default.html            // The layout called by default
    │   │   └── post.html               // A layout which calls default and adds some markups
    │   ├── _pages                      // Your pages which will be at the root of the project
    │   │   ├── feed.xml                // RSS page
    │   │   └── index.html              // Main page
    │   ├── _partials                   // Elements you can call everywhere in your pages (it's the jekyll _includes folder)
    │   ├── _posts                      // Posts for blog
    │   │   └── _drafts                 // Posts you don't want to publish
    │   ├── assets                      // All about design
    │   │   ├── _components             // Folder for bower elements
    │   │   ├── _images                 // Design images
    │   │   ├── _scripts                // JS
    │   │   │   └── script.js           // a JS file
    │   │   ├── _styles                 // CSS
    │   │   │   ├── _font-icons.scss    // Used if you use grunt-webfont (svg-to-font tool), do not edit it
    │   │   │   └── style.scss          // Where you put all your styles
    │   │   ├── _glyphicons           // SVG transformed into fonts
    │   │   └── fonts                   // Fonts
    │   └── medias                      // Content elements like videos, images, audios
    ├── .bowerrc                        // Where you define your options for bower
    ├── Gruntfile.js                    // Compilation file
    ├── component.json                  // Where you define your options used by bower
    ├── happy-plan.default.json         // All config used by happy plan
    ├── happy-plan.json                 // You can create this file to override the default config.
    └── README.md                       // PLEASE, READ IT, but it seems you are

## TL;DR
According you already have ruby and npm installed.

    $ gem install jekyll compass && npm install -g grunt-cli bower && npm install

## Requirements

The easy way is on **OS X** (but it shouldn't be so hard to make this working on any unix like system. Make a PR :)).

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

### Optionals

#### Grunt-Webfont[[+](https://github.com/sapegin/grunt-webfont#installation)]

    $ brew install fontforge ttfautohint
    $ brew install https://raw.github.com/sapegin/grunt-webfont/master/Formula/sfnt2woff.rb

#### Bower [[+](https://github.com/twitter/bower#installing-bower)]

    $ npm install -g bower

### Required for testing

#### Tree [[+](http://mama.indstate.edu/users/ice/tree/)]

    $ brew install tree
---

## Installation

When everything above is okay, just run:

    $ npm install

That's it. Now you can start your website bro'.

### Configuration

You can create a `happy-plan.json` at the root to override the content of `happy-plan.default.json`. Both will be **deeply merged** together.

To configure others used tools, you have differentes possibilities depending on the tool.

#### Bower

Bower configuration file is generated from the `bower.bowerrc` section in the `happy-plan` configuration

#### `/src/_configs/*`

`.hlb` files are [handlebar](http://handlebarsjs.com/) templates parsed by [assemble](https://github.com/assemble/assemble) grunt task where Happy-Plan JSON configuration is available.
You can use edit `hlb` files `/src/_configs/*.hlb` that should be created from `.sample` ones if one doesn't exist.

* **Jekyll**: `_config.yml` is `/src/_configs/jekyll._config.yml.hlb`

* **Compass**: `config.rb` is `/src/_configs/compass.config.rb.hlb`

To generate these 3 configurations files (bower, jekyll & compass) before launching the `dev` task (eg: to install a bower component) you can run

    $ grunt happyPlan:init

*This task is not required since it's launched by all build tasks*

## Build

To build the website

    $ grunt dist

### Development

Using `watch` will allow you to test & dev your posts with livereload included (it needs a [livereload browser extension](http://go.livereload.com/extensions))

    $ grunt

#### Server

When you start `grunt`, you already have a server started to display your webpages. `http://localhost:8080` should be opened in your browser automatically :)

---

## Publish on gh-pages (github)

If you want to publish your build on the gh-pages:

    $ grunt publish

This script builds the website (grunt dist) & commit + push on gh-pages branch.

#### Warning for username.github.com

`username.github.com` is a bit special. Indeed, the `master` branch acts like a `gh-pages` so you have to publish your website on `master` and not `gh-pages` (don't try `gh-pages`, it won't work).

For that, create or modify `happy-plan.json` and add this option:

```
"git": {
    "branch": "master"
  }
```

Now you can easily push your website on this branch via `$ grunt publish`


## Create a new post

Want to create a new post quickly? No problem.

    $ happyPlan newpost

This create a new post in `src/_posts/_drafts`.

For more informations about posts, just read [Jekyll's doc](https://github.com/mojombo/jekyll/wiki)

## Command helper

There is an available `happyplan` binary. You can add `./bin`to your PATH to be able to call this bin directly instead of grunt.

Here is the available commands

Generate required configuration from `happy-plan.json`

    $ happyplan init

Launch the development task (init, build, watch, server & auto open)

    $ happyplan dev

Launch the optimized build for distribution

    $ happyplan dist

## Contributing

When you want to fix a bug or add a feature, just be sure to get all testing requirements installed, & run tests before making your *Pull Request*.

You can run in one command the build process & the tests.

    $ npm test

In case you don't know it yet, `npm {cmd}` just run the command `{cmd}` specified in the `package.json`. In our case, it run `grunt test`. And to be precise, the `test` task run the `dist` task & the `nodeunit` one.

---

## Upgrading version

To get latest stable update you can just merge

    $ git remote add happy-plan git@github.com:kud/happy-plan.git
    $ git pull happy-plan master

To try experimental features, you can just git pull another branch like this

    $ git pull happy-plan feature-x

**When you update from remote be careful to following *Release history* to update if needed you configuration files until we found a simpler solution to handle updates**

## Release History

  * Unreleased   v0.3.0   Update dependencies (Node 0.10 support), add JSHint & Travis-CI, add configurable configuration files, add embed server & auto open in the browser. Also switch Fontcustom for grunt-webfont.
 * 2013-02-02   v0.2.0   Add config file, change folder tree
 * 2013-01-31   v0.1.1   Update to Grunt 0.4
 * 2013-01-29   v0.1.0   Real first release as Happy-Plan

---

## Migrations

[Jekyll already have a migration doc](https://github.com/mojombo/jekyll/wiki/blog-migrations)

Note: For Wordpress, [wordpress-to-jekyll-exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter) seems a quick & good choice (+ keep disqus thread id !)

---

## Support

Come up and say hello on [IRC](http://webchat.freenode.net/?channels=happyplan)! We'll be glad to answer you if you have any questions.

    #happyplan @ irc.freenode.net

