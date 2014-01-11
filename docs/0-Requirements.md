# Requirements

## Node.js/NPM [[+](https://github.com/joyent/node/wiki/Installation)]

    $ brew install node

## Grunt.js CLI [[+](http://gruntjs.com/getting-started)]

    $ npm install -g grunt-cli

## HappyPlan CLI

    $ npm install -g happyplan-cli

## Optionals

### Bower [[+](https://github.com/bower/bower#installing-bower)]

    $ npm install -g bower

### Grunt-Webfont options [[+](https://github.com/sapegin/grunt-webfont#installation)]

To improve font hint

    $ brew install ttfautohint

To use fontforge instead of node engine

    $ brew install fontforge

Note: To use fontforge engine, you also need to specify in your `happyplan.json`

```js
{
  "glyphicons": {
    "engine": "fontforge"
  }
}
```
