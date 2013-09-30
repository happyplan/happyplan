module.exports = function(grunt, happyplan) {
  "use strict";

  grunt.registerTask('happyplan:server', [
    'connect:server',
    'open:server',
    'watch'
  ])
}
