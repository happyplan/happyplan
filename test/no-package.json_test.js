var grunt = require('grunt');

exports.nopackagejson = {
  posts: function(test) {
    'use strict';
    
    test.expect(1);
    
    grunt.util.spawn({
      cmd: 'grunt',
      args: ['happyplan:dist', '--base=test/no-package.json']
    },
    function doneFunction(error, result, code) {
      test.ok(error && result.stdout.indexOf("'package.json' is required") > -1, "no package.json make happyplan unable to run");
      test.done();
    });
  }
};
