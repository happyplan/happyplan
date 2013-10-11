module.exports = function prepareThemes(grunt) {
  "use strict";

  var happyplan = grunt.config.get('happyplan')
    , helpers = grunt.config.getRaw(['happyplan', 'html', 'helpers'])

  // create some variables for html engine
  var assetsType = ["styles", "scripts"]
  assetsType.forEach(function(type) {
    var assets = require('../lib/get-theme-config')(grunt, ['assets', type])
    for (var data in assets) {
      assets[data].hook = assets[data].hook ? assets[data].hook : happyplan.assets.default_hook[type]
      if (assets[data].ifIE) {
        happyplan.html.hooks[assets[data].hook] += '<!--[if ' + (typeof assets[data].ifIE === 'string' ? assets[data].ifIE : 'IE') + ']>'
      }
      happyplan.html.hooks[assets[data].hook] += grunt.template.process(helpers[type], {
        data: grunt.util._.extend({}, assets[data], {
          happyplan: happyplan,
          dest: (assets[data].dest + (happyplan.env == 'dist' && happyplan.cachebuster ? '?' + happyplan.cachebuster : '' ))
            .replace(
              happyplan.path.dist.assets[type],
              happyplan.baseUrls[type]
            )
        })
      })
      if (assets[data].ifIE) {
        happyplan.html.hooks[assets[data].hook] += '<![endif]-->'
      }
      happyplan.html.hooks[assets[data].hook] += "\n"
    }
  })

  grunt.config.set("happyplan", happyplan)
}
