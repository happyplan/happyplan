module.exports = function(grunt) {
  "use strict";

  grunt.registerTask('test', [
    'jshint',
    'clean:test_sandbox',
    'nodeunit'
  ])
}
