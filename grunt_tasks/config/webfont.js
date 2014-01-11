module.exports = function(grunt) {
  "use strict";

  var getThemeConfig = require('../lib/get-theme-config')
    , happyplan = grunt.config.get('happyplan')
    , glyphicons = []

  getThemeConfig(grunt, ['path', 'assets', 'glyphicons'], { merge: true } ).forEach(function(src) {
    glyphicons.push(src + '/**/*.svg')
  });

  return {
    glyphicons: {
      src: glyphicons,
      dest: '<%= happyplan.path.dist.assets.fonts %>',
      destCss: '<%= happyplan.path.build.assets.styles %>',
      options: {
          relativeFontPath: require('path').relative(
            happyplan.cwd + '/' + grunt.config.get(['happyplan', 'path', 'dist', 'assets', 'styles']),
            happyplan.cwd + '/' + grunt.config.get(['happyplan', 'path', 'dist', 'assets', 'fonts'])
          ),
          stylesheet: 'scss',
          hashes: false,
          htmlDemo: false,
          engine: '<%= happyplan.glyphicons.engine %>'
      }
    }
  }
}
