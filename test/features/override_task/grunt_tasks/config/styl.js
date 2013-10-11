module.exports = function(grunt) {
  "use strict";

  var happyplan = grunt.config.get('happyplan')
    , styles = require(happyplan._ + '/grunt_tasks/lib/get-theme-config')(grunt, ['assets', 'styles'])
    , files = {}

  if (styles) {
    styles.forEach(function(style) {
      if (style.src) {
        if (grunt.file.exists(style.src)) {
          files[style.dest] = style.src;
        }
        else {
          grunt.fail.warn(style.src + ' doesnt exists, error triggered to avoid incomprehensible libsass error :)')
        }
      }
    })
  }
  console.log(happyplan.styl)
  return {
    styles: {
      options: '<%= happyplan.styl %>',
      files: files
    }
  }
}
