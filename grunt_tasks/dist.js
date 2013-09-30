module.exports = function(grunt, happyplan) {
  "use strict";

  grunt.registerTask('happyplan:dist', [
    'jshint',
    'happyplan:build',
    'imagemin:dist'
  ])
}
