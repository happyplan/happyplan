# Happy Plan!

> When Grunt.js uses Jekyll as a peon.

Happy plan is bundle of amazing tools to be used as a static website generator. It's all about fun and so easy to publish on [gh-pages](http://pages.github.com/).

### What in it?

* A static website generator from html or markdown: [Jekyll](https://github.com/mojombo/jekyll).
* A task-based command line build tool: [Grunt.js](http://gruntjs.com/) & some pre-defined tasks (scripts, styles & images automatic compression).
* An amazing CSS pre-processor, Sass directly served with [Compass](http://compass-style.org/).
* A quick way to provide scalable icons as font thanks to [Fontcustom](http://fontcustom.com/) & a Grunt task.
* A [Livereload](http://livereload.com/) server ([tiny-lr](https://github.com/mklabs/tiny-lr)) to make development as fast as hell.
* A package manager for the web called [Bower](https://github.com/twitter/bower).

Oh, by the way, [why "happy plan"](http://www.youtube.com/watch?v=5zVVKXT8Vi0)?

## Requirements

The easy way on OS X.

### Jekyll [+](https://github.com/mojombo/jekyll/wiki/install)

    $ (sudo) gem install jekyll

### Node.js [+](https://github.com/joyent/node/wiki/Installation)

    $ brew install node

#### Npm [+](https://github.com/isaacs/npm)

    $ curl http://npmjs.org/install.sh | sh

### Grunt.js (0.4)

    $ npm install -g grunt-cli

### Compass

    $ (sudo) gem install compass

### Optionals

#### Fontcustom [+](http://fontcustom.com/#installation)

    $ brew install fontforge eot-utils ttfautohint
    $ (sudo) gem install fontcustom

##### More for [grunt-webfont](https://github.com/sapegin/grunt-webfont) task

    $ brew install ttf2eot
    $ brew install https://raw.github.com/sapegin/grunt-webfont/master/Formula/sfnt2woff.rb

#### [Bower](https://github.com/twitter/bower)

    $ npm install bower -g

## Installation

When everything above is okay, just run:

    $ npm install

That's it. Now you can start your website bro'.

## Build

To build the website

    $ grunt dist

## Development

Using `watch` will allow you to test & dev your posts with livereload included (it needs a [livereload browser extension](http://go.livereload.com/extensions))

    $ grunt

## Publish on gh-pages (github)

If you want to publish your build on the gh-pages:

    $ bin/publish.sh

This script just build the website (grunt dist) & commit + push on gh-pages branch.

## Create a new post

Want to create a new post quickly? No problem.

    $ node bin/newpost.js

This create a new post in `src/_posts`.

For more informations about posts, just read [Jekyll's doc](https://github.com/mojombo/jekyll/wiki)

# Migrations

[Jekyll already have a migration doc](https://github.com/mojombo/jekyll/wiki/blog-migrations)

Note: For Wordpress, [wordpress-to-jekyll-exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter) seems a quick & good choice (+ keep disqus thread id !)

