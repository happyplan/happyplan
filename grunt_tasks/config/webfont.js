module.exports = function(grunt, happyplan) {
  "use strict";

  return {
    glyphicons: {
      src: '<%= happyplan.build.assets.glyphicons %>/*.svg',
      dest: '<%= happyplan.dist.assets.fonts %>',
      destCss: '<%= happyplan.theme.local.assets.styles %>',
      options: {
          relativeFontPath: require('path').relative(
            // we must process template here because it's not already done by the grunt.init at this time
            // PR if u have a better solution :)
            __dirname + '/' + grunt.template.process('<%= happyplan.dist.assets.styles %>', { data: { happyplan: happyplan}}),
            __dirname + '/' + grunt.template.process('<%= happyplan.dist.assets.fonts %>', { data: { happyplan: happyplan}})
          ),
          stylesheet: 'scss',
          hashes: false,
          htmlDemo: false
      }
    }
  }
}
