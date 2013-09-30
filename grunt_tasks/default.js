module.exports = function(grunt, happyplan) {
  "use strict";

  grunt.registerTask('happyplan:default', [
    'happyplan:dev',
    'happyplan:server'
  ])
}
