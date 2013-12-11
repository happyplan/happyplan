module.exports.register = function(Handlebars, options, params) {
  "use strict";

  var urlReplacements = [
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

  /*
   * Usage: {{ url [file] }}
   */
  Handlebars.registerHelper("url", function(file, options) {
    var url = file
    urlReplacements.forEach(function(o) {
      url = url.replace(o.regexp, o.replacement)
    })

    return url
  })
}

