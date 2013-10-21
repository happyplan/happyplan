module.exports = function(grunt) {
  "use strict";

  var fs = require('fs')
    , path = require('path')
    , getThemeConfig = require('../lib/get-theme-config')
    , happyplan = grunt.config.getRaw('happyplan')
    , filesPatterns = happyplan.excludeFilesPatterns.slice()
    , staticFiles = []

  filesPatterns.unshift('!**/*.hbs')
  happyplan.dotfiles.forEach(function(dotfile) {
    filesPatterns.unshift(dotfile)
  })
  filesPatterns.unshift('**/*')

  getThemeConfig(grunt, ['path', '_'], { merge: true } ).forEach(function(src) {
    staticFiles.push({
      expand: true,
      cwd: src,
      src: filesPatterns,
      dest: '<%= happyplan.path.dist._ %>/'
    })
  });

  return grunt.util._.extend({}, happyplan.themesCopyTask, {
    cssAsScss: {
      files: [{
        expand: true,
        cwd: '<%= happyplan.bower_components %>',
        src: ['**/*.css'],
        dest: '<%= happyplan.bower_components %>',
        filter: function(src) {
          if (fs.statSync(src).isFile()) {
            // try to see if a similar Scss partials doesn't exist already
            try {
              return !fs.statSync(path.dirname(src) + path.sep + '_' + path.basename(src, '.css') + '.scss').isFile();
            }
            catch (e) {
              return e.code === 'ENOENT';
            }
          }

          return false;
        },
        ext:    ".scss"
      }]
    },

    staticFiles: {
      files: staticFiles
    },

    images: {
      files: [{
        expand: true,
        cwd: '<%= happyplan.path.build.assets.images %>',
        src: '<%= happyplan.assets.images.src %>',
        dest: '<%= happyplan.path.dist.assets.images %>'
      }]
    }
  })
}
