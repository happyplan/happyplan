module.exports = function(grunt) {
  "use strict";

  var getThemeConfig = require('../lib/get-theme-config')
    , happyplan = grunt.config.getRaw('happyplan')
    , filesPatterns = happyplan.excludeFilesPatterns.slice()

    , helpers = [require('path').relative(happyplan.cwd, happyplan._ +'/node_modules/helper-moment/moment.js')]
    , partials = []
    , files = []

  filesPatterns.unshift('**/*.hbs')

  getThemeConfig(grunt, ['path', 'html', 'partials'], { merge: true } ).forEach(function(src) {
    partials.push(src + '/**/*.hbs')
  });

  getThemeConfig(grunt, ['path', 'html', 'helpers'], { merge: true } ).forEach(function(src) {
    helpers.push(src + '/**/*.js')
  });

  getThemeConfig(grunt, ['path', 'html', '_'], { merge: true } ).forEach(function(src) {
    // retrieve files from parent theme that are not existing already from child theme
    var themeFiles = grunt.file.expandMapping(filesPatterns, '<%= happyplan.path.dist._ %>/', { cwd: src })
      , newFiles = []

    files.forEach(function(file) {
      var existingInChildTheme = false
      themeFiles.forEach(function(thfile) {
        if (thfile.dest === file.dest) {
           existingInChildTheme = true
        }
      })
      if (!existingInChildTheme) {
        newFiles.push(file)
      }
    })
    files = newFiles.concat(themeFiles)
  });

  return {
    options: {
      assets: '<%= happyplan.path.assets._ %>',
      layoutdir: '<%= happyplan.path.build.html.layouts %>',
      partials: partials,
      helpers: helpers,
      ext: '',

      happyplan: '<%= happyplan %>',
    },
    html: {
      files: files
    }
  }
}
