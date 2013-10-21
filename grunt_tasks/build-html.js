module.exports = function(grunt) {
  "use strict";

  grunt.registerTask('happyplan:build-html', 'Build the html for the website', [
      'happyplan:prepare-build-html'
    , 'assemble:html'
    , 'copy:staticFiles'
  ])
}
