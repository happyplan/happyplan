module.exports = function(grunt) {
  "use strict";

  var env = grunt.option('env');

  grunt.registerTask('happyplan:build-assets', 'Build the assets for the website', [
    'copy:cssAsScss',

    'happyplan:prepare-build-assets', // created in Gruntfile

    // assets
    'copy:images',
    'happyplan:glyphicons',

    // css
    //'sass'
    // css
    'happyplan:config-compass',
    'compass:' + env,
    'autoprefixer',

    // js
    (env === 'dist' ? 'uglify' : 'concat') + ':scripts_' + env
  ])
}
