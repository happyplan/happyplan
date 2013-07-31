var grunt = require('grunt');

exports.newpost = {
  posts: function(test) {
    'use strict';
    
    // -name should be the key
    var testsOpts = {
      'name': [
        '--name="Name"'
      ],
      'name-tags': [
        '--name="Name Tags"',
        '--tags="change,me,dude"'
      ],
      'name-one-tags': [
        '--name="Name One Tags"',
        '--tags="change"'
      ],
      'name-tag': [
        '--name="Name Tag"',
        '--tag="change,me,dude"'
      ],
      'name-one-tag': [
        '--name="Name One Tag"',
        '--tag="change"'
      ],
      'change-me': []
    };
    var testsOptsLength = 6;
    test.expect(testsOptsLength);
    
    var testI = 0;
    grunt.util._.each(testsOpts, function(opts, key) {
      opts.push('happyplan:newpost');
      opts.push('--base=test/sandbox');
      grunt.util.spawn({
        cmd: 'grunt',
        args: opts
      },
      function doneFunction(error, result, code) {
        if (error) {
          if (result.stdout) {
            console.log("\n" + result.stdout);
          }
          if (result.sterr) {
            console.log("\n" + result.sterr);
          }
          
          throw error;
        }
        
        test.deepEqual(
          grunt.file.read('test/expected/newpost/' + key + '.md'),
          grunt.file.read('test/sandbox/src/_posts/_drafts/' +grunt.template.today('yyyy-mm-dd') + '-' + key + '.md'),
          'Created Posts should be like expectations'
        );

        testI++;
        if (testI===testsOptsLength) {
          test.done();
        }
      });
    });
  }
};
