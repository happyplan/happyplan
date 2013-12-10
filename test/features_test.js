var cwd = process.cwd()
  , path = require('path')
  , grunt = require('grunt')

exports.themes = {
  dist: function(test) {
    "use strict";

    function testFeatures(features) {
      var testI = 0
      grunt.util._.each(features, function(testPath) {
        grunt.util.spawn({
          cmd: 'npm',
          args: ['install'],
          opts: {
            cwd: testPath
          }
        },
        function doneFunction(error, result, code) {
           if (error) {
            if (result.stdout) {
              console.log(result.stdout)
            }
            if (result.sterr) {
              console.log(result.sterr.red)
            }

            throw error
          }

          grunt.util.spawn({
            cmd: 'grunt',
            args: [
                'happyplan:dist'
              , "--base=" + testPath
              , "--verbose"
              , "--stack"
            ]
          },
          function doneFunction(error, result, code) {
            console.log("\n\n❯ " + path.basename(testPath).cyan)
            console.log("Build finished...".grey)

            if (error) {
              if (result.stdout) {
                console.log(result.stdout)
              }
              if (result.sterr) {
                console.log(result.sterr.red)
              }

              throw error
            }

            console.log("Computing diff...".grey)

            grunt.util.spawn({
              cmd: 'diff',
              args: [
                '-r',
                '-q',
                testPath + '/dist',
                testPath + '/expected',
                // icons font are generated with a timestamp somewhere, can test that quickly with a diff
                // @todo add one more test for that
                '--exclude=icons.*'
              ]
            },
            function doneFunction(error, diffResult, code) {
              if (error) {
                if (diffResult.stdout || diffResult.sterr) {
                  if (result.stdout) {
                    console.log(result.stdout)
                  }
                  if (result.sterr) {
                    console.log(result.sterr.red)
                  }

                  if (diffResult.stdout) {
                    console.log(diffResult.stdout.red)
                  }
                  if (diffResult.sterr) {
                    console.log(diffResult.sterr.red)
                  }
                }
              }

              test.ok(!diffResult.stdout && !diffResult.sterr, 'There should have no diff between builds')

              testI++
              if (testI===features.length) {
                test.done()
              }
            })
          })
        })
      })
    }

    if (grunt.option('features')) {
      var features = []
      grunt.option('features').split(',').forEach(function(arg) {
        features.push(cwd + '/test/features/' + arg)
      })

      testFeatures(features)

      test.expect(features.length)
    }
    else {
      require('glob')(cwd + '/test/features/*', function(error, files) {
        if (error) {
          grunt.log.writeln("Unable to try features")
          throw error
        }

        testFeatures(files)

        test.expect(files.length)
      })
    }
  }
}
