var grunt = require('grunt');

exports.themes = {
  dist: function(test) {
    'use strict';
    var cwd = process.cwd();

    require('glob')(cwd + '/test/features/*', function(error, files) {
      if (error) {
        grunt.log.writeln("Unable to try features");
        throw error;
      }

      test.expect(files.length);
      var testI = 0;
      grunt.util._.each(files, function(path) {
        console.log(path);
        grunt.util.spawn({
          cmd: 'grunt',
          args: [
            'happyplan:dist',
            "--verbose",
            "--stack",
            "--base=" + path
          ]
        },
        function doneFunction(error, result, code) {
          console.log("Build finished, checking errors");

          if (error) {
            // if (result.stdout) {
              console.log(result.stdout);
            // }
            // if (result.sterr) {
              console.log(result.sterr);
            // }

            throw error;
          }

          console.log("Build ok, computing diff");

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
            if (diffResult.stdout || diffResult.sterr) {
              if (result.stdout) {
                grunt.verbose.writeln(result.stdout);
              }
              if (result.sterr) {
                grunt.verbose.writeln(result.sterr);
              }

              if (diffResult.stdout) {
                console.log("\n" + diffResult.stdout);
              }
              if (diffResult.sterr) {
                console.log("\n" + diffResult.sterr);
              }
            }
            else if (error) {
              throw error;
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
