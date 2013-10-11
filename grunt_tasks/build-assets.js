module.exports = function(grunt) {
  "use strict";

  var env = grunt.option('env');

  grunt.registerTask('happyplan:build-assets', 'Build the assets for the website', [
      'copy:cssAsScss'

    // created during runtime
    , 'happyplan:prepare-build-assets'

    // assets
    , 'copy:images'
    , 'happyplan:glyphicons'

    // css
    , 'happyplan:build-styles'

    // js
    , (env === 'dist' ? 'uglify' : 'concat') + ':scripts_' + env
  ])


}
