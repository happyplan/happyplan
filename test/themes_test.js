var grunt = require('grunt');

exports.themes = {
  dist: function(test) {
    'use strict';
    var cwd = process.cwd();

    require('glob')(cwd + '/test/themes/*', function(error, files) {
      if (error !== null) {
        throw error;
      }
      
      test.expect(files.length);
      var testI = 0;
      grunt.util._.each(files, function(path) {
        grunt.util.spawn({
          cmd: 'grunt',
          args: [
            'happyplan:dist',
            "--verbose",
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
          function doneFunction(error, diffResult, code) {
            if (error) {              
              if (diffResult.stdout) {
                console.log("\n" + diffResult.stdout);
              }
              if (diffResult.sterr) {
                console.log("\n" + diffResult.sterr);
              }
              
              if (!diffResult.stdout && !diffResult.sterr) {
                if (result.stdout) {
                  console.log(result.stdout);
                }
                if (result.sterr) {
                  console.log(result.sterr);
                }
                throw error;
              }
            }
            
            test.deepEqual("", diffResult.stdout, 'There should have no diff between builds');

            testI++;
            if (testI===files.length) {
              test.done();
            }
          });
        });
      });
    });
  }
};
