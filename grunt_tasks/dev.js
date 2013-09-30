module.exports = function(grunt, happyplan) {
  "use strict";

  grunt.registerTask('happyplan:dev', [
    'jshint',
    'happyplan:build'
  ])
}
