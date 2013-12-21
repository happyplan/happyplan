module.exports = function(grunt) {
  "use strict";

  var path = require('path')
    , codeMirrorHighlight = require('highlight-codemirror')
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

      , marked: {
        highlight: function (code, lang) {
          if (lang) {
            try {
              var langs = happyplan.codeHighlightMap[lang] ? happyplan.codeHighlightMap[lang] : [lang]
              for(var i in langs) {
                codeMirrorHighlight.loadMode(langs[i])
              }
              //`name` options should be `mode`
              //https://github.com/ForbesLindesay/highlight-codemirror/issues/1
              return codeMirrorHighlight.highlight(code, { name: langs[langs.length-1] })
            }
            catch(e) {
              if (e.code === 'MODULE_NOT_FOUND') {
                grunt.log.warn('Language "' + lang + '" not found or doesn\'t have an mapped corresponding language.')
              }
              else {
                grunt.warn(e)
              }
            }
          }

          return code
        }
      }
    }
  , html: {
      files: files
    }
  }
}
