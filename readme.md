# Happy Plan!

> When Grunt.js use Jekyll as a peon

Happy plan is bundle of awesome tool to be used as a static website generator. It's all about fun and so easy to publish on gh-pages.

What in it ?

* A static Website generator from html or markdown : [Jekyll](https://github.com/mojombo/jekyll)
* A task-based command line build tool : [Grunt.js](http://gruntjs.com/) & some pre defined task (scripts, styles & images automatic compression)
* A awesome CSS pre-processor, Sass direclty served with [Compass](http://compass-style.org/)
* A quick way to provide scalable icon as font thanks to [Fontcustom](http://fontcustom.com/) & a Grunt task.
* A [Livereload](http://livereload.com/) server ([tiny-lr](https://github.com/mklabs/tiny-lr)), to make development as fast as hell.
* Bower

Oh, by the way, [why "happy plan"](http://www.youtube.com/watch?v=5zVVKXT8Vi0) ?

## Requirements

The easy way on OS X.

### Jekyll

    (sudo) gem install jekyll

[More about how to install Jekyll](https://github.com/mojombo/jekyll/wiki/install)

### Node.js

    brew install node

[More about how to install Node](https://github.com/joyent/node/wiki/Installation)

#### Npm

    curl http://npmjs.org/install.sh | sh

[More about how to install Npm](https://github.com/isaacs/npm)    

### Grunt.js (0.4)

    npm install -g grunt-cli

### Compass

    (sudo) gem install compass

### Optionals

#### Fontcustom

    brew install fontforge eot-utils ttfautohint
    (sudo) gem install fontcustom

[More about how to install Fontcustom](http://fontcustom.com/#installation)

##### More for [grunt-webfont](https://github.com/sapegin/grunt-webfont) task

    brew install ttf2eot
    brew install https://raw.github.com/sapegin/grunt-webfont/master/Formula/sfnt2woff.rb

#### [Bower](https://github.com/twitter/bower)

    npm install bower -g

## Installation

When everything above is okay, just run

    npm install

That's it. Now you can start your website bro'.

## Build

To build the website

    $ grunt dist

## Development

Using `watch` will allow you to test & dev your posts, with livereload included (need a [livereload browser extension](http://go.livereload.com/extensions))

    $ grunt

## Publish on gh-pages (github)

If you want to publish your build on the gh-pages

    $ bin/publish.sh

This script just build the website (grunt dist) & commit + push on gh-pages branch.

## Create a new post

Want to create a new post quickly ? No problem.

    $ node bin/newpost.js

This create a new post in `src/_posts`.

For more informations about posts, just read [Jekyll's doc](https://github.com/mojombo/jekyll/wiki)

# Migrations

[Jekyll already have a migration doc](https://github.com/mojombo/jekyll/wiki/blog-migrations)

Note: For Wordpress, [wordpress-to-jekyll-exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter) seems a quick & good choice (+ keep disqus thread id !)

