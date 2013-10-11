# HappyPlan!

[![Build Status](https://travis-ci.org/happyplan/happyplan.png?branch=master)](https://travis-ci.org/happyplan/happyplan)
[![Dependencies Status](https://david-dm.org/happyplan/happyplan.png)](https://david-dm.org/happyplan/happyplan)
[![Dev Dependencies Status](https://david-dm.org/happyplan/happyplan/dev-status.png)](https://david-dm.org/happyplan/happyplan#info=devDependencies)

<img align="right" src="https://raw.github.com/happyplan/happyplan/master/logo.png" />

> When Grunt.js uses Jekyll as a peon.

HappyPlan is a static website generator based on a bundle of amazing tools.
It's just all about fun.

### What in it ?

* A static website generator from html or markdown: [Jekyll](http://jekyllrb.com/).
* A task-based command line build tool: [Grunt.js](http://gruntjs.com/) & all pre-defined tasks you'll need (scripts, styles & images automatic minification & compression).
* An amazing CSS pre-processor, [Sass](http://sass-lang.com/) (via [libsass](https://github.com/hcatlin/libsass).
* A quick way to provide scalable icons as font thanks an awesome Grunt task [grunt-webfont](https://github.com/sapegin/grunt-webfont).
* A [Livereload](http://livereload.com/) server provided by the [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) task) to make development as fast as hell.
* Support the [Bower](http://bower.io/) package manager to handle web components.

_Notice: you can change/override/add stuff very easily, thanks to grunt. [More about that in the documentation](https://github.com/happyplan/happyplan/blob/master/docs/2-Configuring-Project.md)_

Oh, by the way, why "happy plan" ? [Here is not the answer](http://www.youtube.com/watch?v=5zVVKXT8Vi0).

## Documentation

Visit the [documentation](docs) for all the things.

## TL;DR

According you already have Ruby and NPM installed you can run this commands :

### Requirements

```bash
npm install -g grunt-cli bower happyplan-cli
gem install bundler
```

[Learn more about requirements](docs/0-Requirements.md).

### Create a project using happyplan

Copy our Gemfile or create one with version you want, then

```bash
npm init
npm install happyplan --save-dev
bundle install --binstubs bundler_gems
happyplan
```

## Contributing

When you want to fix a bug or add a feature, just be sure to get all testing requirements installed, & run tests before making your *Pull Request*.

You can run in one command the build process & the tests.

    npm install
    npm test

In case you don't know it yet, `npm {cmd}` just run the command `{cmd}` specified in the `package.json` `script` section. In our case, it run `grunt test`. And to be precise, the `test` task run the `nodeunit` one.

## Release History

Checkout [CHANGELOG](CHANGELOG.md)

## Support

### IRC

Come up and say hello on [IRC](http://webchat.freenode.net/?channels=happyplan)! We'll be glad to answer you if you have any questions.

<a href="irc://irc.freenode.net/#happyplan">#happyplan on irc.freenode.net</a>

### Twitter

Follow us on Twitter to get latest news: [@happyplanapp](https://twitter.com/happyplanapp)

## Credits

Thank you [Catherine Please](http://www.catherineplease.com/) for your excellent logo.

## Authors

+ [@kud](https://github.com/kud)
+ [@MoOx](https://github.com/MoOx)
