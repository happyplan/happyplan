var grunt = require('grunt');

exports.themes = {
  dist: function(test) {
    'use strict';
    var cwd = process.cwd();
    var themes = [
      cwd + '/test/themes/default',
      cwd + '/test/themes/child',
      cwd + '/test/themes/parent'
    ];

    test.expect(themes.length);
    var testI = 0;
    grunt.util._.each(themes, function(path) {
      grunt.util.spawn({
        cmd: 'grunt',
        args: [
          'happyplan:dist',
          "--verbose",
          "--env=dist",
          "--base=" + path
        ]
      },
      function doneFunction(error, result, code) {
        if (error) {
          if (result.stdout) {
            console.log(result.stdout);
          }
          if (result.sterr) {
            console.log(result.sterr);
          }
          
          throw error;
        }

        grunt.util.spawn({
          cmd: 'diff',
          args: [
            '-r',
            path + '/dist',
            path + '/expected',
            // icons font are generated with a timestamp somewhere, can test that quickly with a diff
            // @todo add one more test for that
            '--exclude=icons.*'
          ]
        },
        function doneFunction(error, result, code) {
          if (result.stdout) {
            console.log(result.stdout);
          }
          if (result.sterr) {
            console.log(result.sterr);
          }
          // if (error) {
          //   throw error;
          // }
          
          test.deepEqual("", result.stdout, 'There should have no diff between builds');

          testI++;
          if (testI===themes.length) {
            test.done();
          }
        });
      });
    });
  }
};
