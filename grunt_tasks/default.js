module.exports = function(grunt) {
  "use strict";

  grunt.registerTask('happyplan:default', [
    'happyplan:dev',
    'happyplan:server'
  ])
}
