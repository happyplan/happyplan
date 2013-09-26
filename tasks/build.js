/*global module*/
module.exports = function (grunt) {
  'use strict';

  var env = grunt.option('env');

  grunt.registerTask('happyplan:build-html', 'Build the html for the website', [
    'clean:jekyll',
    'happyplan:prepare-build-html', // created in Gruntfile
    'happyplan:config-jekyll',
    'jekyll:' + env,
    'copy:jekyll-dist'
  ]);

  grunt.registerTask('happyplan:build-assets', 'Build the assets for the website', [
    'copy:cssAsScss',

    'happyplan:prepare-build-assets', // created in Gruntfile

    // assets
    'copy:images',
    'happyplan:glyphicons',

    // css
    'happyplan:config-compass',
    'compass:' + env,
    'autoprefixer',

    // js
    (env === 'dist' ? 'uglify' : 'concat') + ':scripts_' + env
  ]);

  grunt.registerTask('happyplan:build', 'Build the website', [
    // clean everything
    'clean:build',
    'clean:dist',

    // run static generator
    'happyplan:build-html',

    // happy plan flavor
    'happyplan:build-assets'
  ]);
};
