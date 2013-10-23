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

  console.log(helpers)

  getThemeConfig(grunt, ['path', 'html', '_'], { merge: true } ).forEach(function(src) {
    files.push({
      expand: true,
      cwd: src,
      src: filesPatterns,
      dest: '<%= happyplan.path.dist._ %>/'
    })
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
