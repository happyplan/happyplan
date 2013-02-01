# Happy Plan!

Happy plan is a static file generator using [jekyll](https://github.com/mojombo/jekyll), [compass](http://compass-style.org/), [fontcustom](http://fontcustom.com/) and [grunt](http://gruntjs.com/). It's all about fun and so easy to publish on gh-pages.

Oh, by the way, [what happy plan is](http://www.youtube.com/watch?v=5zVVKXT8Vi0)?

## Installation

Well, all the stuff I said above. Too lazy to explain for the moment; Oh come on, you're a rockstar, aren't you?

## Build

Default grunt task build the website

    $ grunt prod

## Watch

Using watch will allow you to test & dev your posts

    $ grunt

## Publish on gh-pages (github)

If you want to publish your build on the gh-pages

    $ bin/publish.sh

## Create a new post

Want to create a new post? No problem

    $ node bin/newpost.js

# Migrations

[Jekyll already have a migration doc](https://github.com/mojombo/jekyll/wiki/blog-migrations)

Note: For Wordpress, [wordpress-to-jekyll-exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter) seems a quick & good choice (+ keep disqus thread id !)

