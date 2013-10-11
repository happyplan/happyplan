module.exports = function(grunt) {
  "use strict";

  var env = grunt.option('env');

  grunt.registerTask('happyplan:build-html', 'Build the html for the website', [
      //'assemble:html'
      'clean:jekyll'
    // created during runtime
    , 'happyplan:prepare-build-html'

    , 'happyplan:config-jekyll'
    , 'jekyll:' + env

    , 'copy:jekyll-dist'
  ])
}
