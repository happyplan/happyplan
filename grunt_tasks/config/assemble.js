module.exports = function(grunt) {
  "use strict";

  var path = require('path')
    , getThemeConfig = require('../lib/get-theme-config')
    , happyplan = grunt.config.getRaw('happyplan')
    , filesPatterns = happyplan.excludeFilesPatterns.slice()

    , assembleOptions = {
        partials: []
      , helpers: [path.relative(happyplan.cwd, happyplan._ +'/node_modules/helper-moment/moment.js')]
      , plugins: []
    }
    , files = []
    , optionsToMerge = [{
          type: 'partials'
        , ext: 'hbs'
      }
      , {
          type: 'helpers'
        , ext: 'js'
      }
      , {
          type: 'plugins'
        , ext: 'js'
      }]

  // add handlebars, otherwise we do nothing here :)
  filesPatterns.unshift('**/*.hbs')

  optionsToMerge.forEach(function(optType) {
    getThemeConfig(grunt, ['path', 'html', optType.type], { merge: true } ).forEach(function(src) {
      assembleOptions[optType.type].push(src + '/**/*.' + optType.ext)
    })
  })

  // https://github.com/assemble/assemble/issues/411
  // dirty fix to remove when the issue above is fixed
  var typesToFix = ['helpers', 'plugins']
  typesToFix.forEach(function(type) {
    assembleOptions[type].forEach(function(item, i, collection) {
      if (item.indexOf(happyplan._) === 0) {
        collection[i] = path.relative(happyplan.cwd, item)
      }
    })
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
  })

  return {
    options: {
        assets: '<%= happyplan.path.assets._ %>'
      , layoutdir: '<%= happyplan.path.build.html.layouts %>'
      , partials: assembleOptions.partials
      , helpers: assembleOptions.helpers
      , plugins: assembleOptions.plugins
      , ext: ''

      , happyplan: '<%= happyplan %>'
    }
  , html: {
      files: files
    }
  }
}
