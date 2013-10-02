module.exports = function(grunt) {
  "use strict";

  return {
    glyphicons: {
      src: '<%= happyplan.build.assets.glyphicons %>/*.svg',
      dest: '<%= happyplan.dist.assets.fonts %>',
      destCss: '<%= happyplan.theme.local.assets.styles %>',
      options: {
          relativeFontPath: require('path').relative(
            __dirname + '/' + grunt.config.get(['happyplan', 'dist', 'assets', 'styles']),
            __dirname + '/' + grunt.config.get(['happyplan', 'dist', 'assets', 'fonts'])
          ),
          stylesheet: 'scss',
          hashes: false,
          htmlDemo: false
      }
    }
  }
}
