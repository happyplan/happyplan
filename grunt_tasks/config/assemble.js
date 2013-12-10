module.exports = function(grunt) {
  "use strict";

  var getThemeConfig = require('../lib/get-theme-config')
    , happyplan = grunt.config.getRaw('happyplan')
    , filesPatterns = happyplan.excludeFilesPatterns.slice()

    , partials = []
    , helpers = [require('path').relative(happyplan.cwd, happyplan._ +'/node_modules/helper-moment/moment.js')]
    , plugins = []
    , files = []

  filesPatterns.unshift('**/*.hbs')

  getThemeConfig(grunt, ['path', 'html', 'partials'], { merge: true } ).forEach(function(src) {
    partials.push(src + '/**/*.hbs')
  });

  getThemeConfig(grunt, ['path', 'html', 'helpers'], { merge: true } ).forEach(function(src) {
    helpers.push(src + '/**/*.js')
  });

  getThemeConfig(grunt, ['path', 'html', 'plugins'], { merge: true } ).forEach(function(src) {
    plugins.push(src + '/**/*.js')
  });

  // https://github.com/assemble/assemble/issues/411
  // dirty fix to remove when the issue above is fixed
  helpers.forEach(function(h, i, helpers) {
    if (h.indexOf(happyplan._) === 0) {
      helpers[i] = require('path').relative(happyplan.cwd, h);
    }
  })
  plugins.forEach(function(p, i, plugins) {
    if (p.indexOf(happyplan._) === 0) {
      plugins[i] = require('path').relative(happyplan.cwd, p);
    }
  })

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
      plugins: plugins,
      ext: '',

      happyplan: '<%= happyplan %>',
    },
    html: {
      files: files
    }
  }
}
