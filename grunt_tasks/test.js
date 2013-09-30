module.exports = function(grunt, happyplan) {
  "use strict";

  grunt.registerTask('test', [
    'jshint',
    'clean:test_sandbox',
    'nodeunit'
  ])
}
