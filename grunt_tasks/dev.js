module.exports = function(grunt) {
  "use strict";

  grunt.registerTask('happyplan:dev', [
    'jshint',
    'happyplan:build'
  ])
}
