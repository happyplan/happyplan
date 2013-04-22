var grunt = require('grunt');
var fs = require('fs');

exports.copy = {
  dist_tree: function(test) {
    'use strict';

    test.expect(1);
    
    grunt.util.spawn({
      cmd: 'tree',
      args: ['dist']
    },
    function doneFunction(error, result, code) {
      if (error) {
        throw error;
      }

      var actual = result.stdout;
      
      var expected = grunt.file.read('test/expected/dist_tree.txt');
      test.deepEqual(expected, actual, 'should have the same folder tree');
      
      test.done();
    });
  }
};