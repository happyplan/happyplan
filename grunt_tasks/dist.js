module.exports = function(grunt) {
  "use strict";

  grunt.registerTask('happyplan:dist', [
    'jshint',
    'happyplan:build',
    'imagemin:dist'
  ])
}
