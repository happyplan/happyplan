module.exports = function(grunt) {
  "use strict";

  var path = require('path')
    , codeMirrorHighlight = require('highlight-codemirror')
    , codeMirrorHighlightLoadedModes = []
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
              if (langs.length) {
                var modeName = langs[langs.length-1]

                // last lang from the array can be a code mirror mime type
                // so it doesn't require to be loaded
                // but this will still need to be used as mode name
                if (modeName.indexOf('/') > -1) {
                  langs.pop()
                  grunt.verbose.write('Language "' + modeName + '" assumed as MIME type & will not be loaded as a mode.')
                }
                for(var i in langs) {
                  if (codeMirrorHighlightLoadedModes.indexOf(langs[i]) === -1) {
                    codeMirrorHighlight.loadMode(langs[i])
                    codeMirrorHighlightLoadedModes.push(langs[i])
                  }
                }
                return codeMirrorHighlight.highlight(code, { name: modeName })
              }
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
