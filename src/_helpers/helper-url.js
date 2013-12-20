module.exports.register = function(Handlebars, options, params) {
  "use strict";

  var path = require('path')
    , urlReplacements = [
  // requirement: remove dist folder
  {
      regexp: new RegExp("^" + params.grunt.config.get(['happyplan', 'path', 'dist', '_']) +  "\/")
    , replacement: ''
  }
  // index.html is useless if it's at the end
  , {
      regexp: /index.html$/
    , replacement: ''
  }]

  function replace(url) {
    urlReplacements.forEach(function(o) {
      url = url.replace(o.regexp, o.replacement)
    })

    return url
  }

  /*
   * Usage: {{ url [file] }}
   */
  Handlebars.registerHelper("url", function(file, options) {
    return replace(file)
  })

  /*
   * Usage: {{ dirname [file] }}
   */
  Handlebars.registerHelper("dirname", function(file, options) {
    return replace(path.dirname(path.normalize(file)))
  })
}

