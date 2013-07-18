/*global module*/
module.exports = function (grunt) {
  'use strict';

  var env = grunt.option('env');

  grunt.registerTask('happyplan:build-html', 'Build the html for the website', [
    'clean:jekyll',
    'happyplan:prepare-build-html', // created in Gruntfile
    'happyplan:config-jekyll',
    'jekyll:compile'
  ]);

  grunt.registerTask('happyplan:build-assets', 'Build the assets for the website', [
    'happyplan:prepare-build-assets', // created in Gruntfile

    // move
    // @todo replace that part by a "copy only modified files"
    // to avoid useless livereload
    //'copy:buildToDist',

    // assets
    'copy:media',
    'copy:images',
    'copy:staticAssets',
    'happyplan:glyphicons',

    // css & js
    'happyplan:config-compass',
    'compass:' + env,
    (env === 'dist' ? 'uglify' : 'concat') + ':scripts_' + env
  ]);

  grunt.registerTask('happyplan:build', 'Build the website', [
    // clean everything
    'clean:dist',

    // run static generator
    'happyplan:build-html',

    // happy plan flavor
    'happyplan:build-assets'
  ]);
};
