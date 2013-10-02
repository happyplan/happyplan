module.exports = function(grunt) {
  "use strict";

  grunt.registerTask('happyplan:server', [
    'connect:server',
    'open:server',
    'watch'
  ])
}
