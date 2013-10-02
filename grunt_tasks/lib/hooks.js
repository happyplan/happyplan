module.exports = function prepareThemes(grunt) {
  "use strict";

  var happyplan = grunt.config.getRaw('happyplan')

  // create some variables for html engine
  var assetsType = ["styles", "scripts"]
  assetsType.forEach(function(type) {
    for (var data in happyplan.assets[type]) {
      happyplan.assets[type][data].hook = happyplan.assets[type][data].hook ? happyplan.assets[type][data].hook : happyplan.assets.default_hook[type];
      if (happyplan.assets[type][data].ifIE) {
        happyplan.html.hooks[happyplan.assets[type][data].hook] += '<!--[if ' + (typeof happyplan.assets[type][data].ifIE === 'string' ? happyplan.assets[type][data].ifIE : 'IE') + ']>'
      }
      happyplan.html.hooks[happyplan.assets[type][data].hook] += grunt.template.process(happyplan.html.helpers[type], {
        data: grunt.util._.extend({}, happyplan.assets[type][data], {
          happyplan: happyplan,
          dest: (grunt.template.process(happyplan.assets[type][data].dest, {data: {happyplan:happyplan}}) + (happyplan.env == 'dist' && happyplan.cachebuster ? '?' + happyplan.cachebuster : '' ))
            .replace(
              grunt.template.process(happyplan.dist.assets[type], {data: {happyplan:happyplan}}),
              grunt.template.process(happyplan.baseUrls[type], {data: {happyplan:happyplan}})
            )
        })
      });
      if (happyplan.assets[type][data].ifIE) {
        happyplan.html.hooks[happyplan.assets[type][data].hook] += '<![endif]-->';
      }
      happyplan.html.hooks[happyplan.assets[type][data].hook] += "\n";
    }
  })
}
