module.exports = function(grunt) {
  "use strict";

  var happyplan = grunt.config.get('happyplan')

  return {
    glyphicons: {
      src: '<%= happyplan.path.build.assets.glyphicons %>/*.svg',
      dest: '<%= happyplan.path.dist.assets.fonts %>',
      destCss: '<%= happyplan.path.assets.styles %>',
      options: {
          relativeFontPath: require('path').relative(
            happyplan.cwd + '/' + grunt.config.get(['happyplan', 'path', 'dist', 'assets', 'styles']),
            happyplan.cwd + '/' + grunt.config.get(['happyplan', 'path', 'dist', 'assets', 'fonts'])
          ),
          stylesheet: 'scss',
          hashes: false,
          htmlDemo: false
      }
    }
  }
}
