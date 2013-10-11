module.exports = function(grunt) {
  "use strict";

  var env = grunt.option('env');

  grunt.registerTask('happyplan:build-styles', 'Build the styles for the website', [
      'sass'
    , 'autoprefixer'
  ])
}
