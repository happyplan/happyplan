# Happy Plan! [![Build Status](https://travis-ci.org/happyplan/happyplan.png?branch=master)](https://travis-ci.org/happyplan/happyplan)

![Logo](https://raw.github.com/happyplan/happyplan/master/logo.png)

> When Grunt.js uses Jekyll as a peon.

Happy plan is a static website generator based on a bundle of amazing tools. It's just all about fun.

### What in it?

* A static website generator from html or markdown: [Jekyll](https://github.com/mojombo/jekyll).
* A task-based command line build tool: [Grunt.js](http://gruntjs.com/) & some pre-defined tasks (scripts, styles & images automatic minification & compression).
* An amazing CSS pre-processor, [Sass](http://sass-lang.com/) directly served with [Compass](http://compass-style.org/).
* A quick way to provide scalable icons as font thanks an awesome Grunt task [grunt-webfont](https://github.com/sapegin/grunt-webfont).
* A [Livereload](http://livereload.com/) server ([tiny-lr](https://github.com/mklabs/tiny-lr) provided by the [grunt-contrib-livereload](https://github.com/gruntjs/grunt-contrib-livereload) task) to make development as fast as hell.
* A package manager for the web called [Bower](https://github.com/twitter/bower) to handle web components.

Oh, by the way, why "happy plan" ? [Here is not the answer](http://www.youtube.com/watch?v=5zVVKXT8Vi0).

## Arborescence

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
    ├── bower.json                      // Where you define your options used by bower
    ├── happyplan.json                  // You can create this file to override the default config.


## TL;DR
According you already have ruby and npm installed.

    $ git clone git://github.com/happyplan/happyplan.git
    $ cd happyplan
    $ gem install jekyll compass 
    $ npm install -g grunt-cli bower happyplan-cli 
    $ npm install

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

You can create a `happyplan.json` at the root to override the content of [`happyplan.default.json`](https://github.com/happyplan/happyplan/blob/master/happy-plan.default.json). Both will be **deeply merged** together.

To configure others used tools, you have differentes possibilities depending on the tool.

#### Compass

If you need/want to add some sass or compass plugin in Happy Plan, just modify your `happyplan.json` and add theses lines:

```
"compass": {
  "require": ['my-plugin']
}
```

#### Bower

Bower configuration file is generated from the `bower.bowerrc` section in the `happyplan` configuration

#### `/src/_configs/*`

`.hlb` files are [handlebar](http://handlebarsjs.com/) templates parsed by [assemble](https://github.com/assemble/assemble) grunt task where Happy-Plan JSON configuration is available.
You can use edit `hlb` files `/src/_configs/*.hlb` that should be created from `.sample` ones if one doesn't exist.

* **Jekyll**: `_config.yml` is `/src/_configs/jekyll._config.yml.hlb`

* **Compass**: `config.rb` is `/src/_configs/compass.config.rb.hlb`

To generate these 3 configurations files (bower, jekyll & compass) before launching the `dev` task (eg: to install a bower component) you can run

    $ happyplan init

*This task is not required since it's launched by all build tasks*

---

## Development

Using `watch` will allow you to test & dev your posts with livereload included (it needs a [livereload browser extension](http://go.livereload.com/extensions))

    $ happyplan dev

#### Server

When you start `happyplan dev`, you already have a server started to display your webpages. `http://localhost:8080` should be opened in your browser automatically :)

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

```
"git": {
    "branch": "master"
  }
```

Now you can easily push your website on this branch via `$ happyplan publish`

## Create a new post

    $ happyplan newpost

This create a new post in `src/_posts/_drafts`. For more informations about posts, just read [Jekyll's doc](https://github.com/mojombo/jekyll/wiki)

---

## Theming

Aye, you can theme Happy Plan, great isn't it?

#### Install a theme

    $ happyplan theme install :themeName

(It will download your theme via bower.)

#### Use a theme

    $ happyplan theme use :themeName

(Warning, it overwrites your files in `src` folder.)

---

## Contributing

When you want to fix a bug or add a feature, just be sure to get all testing requirements installed, & run tests before making your *Pull Request*.

You can run in one command the build process & the tests.

    $ npm test

In case you don't know it yet, `npm {cmd}` just run the command `{cmd}` specified in the `package.json`. In our case, it run `grunt test`. And to be precise, the `test` task run the `dist` task & the `nodeunit` one.

---

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

And folllow us on Twitter too: [@happyplanapp](https://twitter.com/happyplanapp)

## Credits

Thank you [Catherine Please](http://www.catherineplease.com/) for your excellent logo.

