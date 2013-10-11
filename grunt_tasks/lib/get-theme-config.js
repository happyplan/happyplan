module.exports = function getThemeConfig(grunt, prop, raw) {
  "use strict";

  raw = raw === undefined ? false : raw;
  var themes = require('./get-themes')(grunt, raw)
    , theme
    //, finalValue = grunt.util.namespace.get(theme, grunt.config.getPropString(prop))
    , value

  for (var themeName in themes) {
    theme = themes[themeName]
    value = grunt.util.namespace.get(theme, grunt.config.getPropString(prop))

    // no merge right now, just return first founded value
    if (value) {
      return value
    }
    // if we want to handle a good merge
    // we need to found a smart way to enable or disable merge for each part
    // eg I want my own styles(heet) but I want one more script(so I want also parent theme scripts)

    // if (finalValue instanceof Array) {
    //   if (value instanceof Array) {
    //     finalValue = value.concat(finalValue)
    //   }
    //   else {
    //     finalValue.unshift(value)
    //   }
    // }
    // else if (finalValue instanceof Object) {
    //   if (value instanceof Object) {
    //     for(i in value) {
    //       theme[i] = custom[i]
    //     }
    //     finalValue = value.concat(finalValue)
    //   }
    //   else {
    //     grunt.fail.warn("Can't append a simple typed value into an object, check your configuration to match parent one")
    //   }
    // }
    // else if (finalValue) {
    //   if (value instanceof Array) {
    //     value.push(finalValue)
    //     finalValue = value
    //   }
    //   else {
    //     grunt.fail.warn("Can't append a simple typed value into an object or an array, check your configuration to match parent one")
    //   }
    // }
    // else {
    //   finalValue = value
    // }
  }

  // return finalValue
}
