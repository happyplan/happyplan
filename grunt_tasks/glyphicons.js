module.exports = function(grunt) {
  "use strict";

  // Execute or skip 'webfont:glyphicons' depending of the presence of SVG files in the '<%= happyplan.path.assets.glyphicons %>' folder.
  grunt.registerTask('happyplan:glyphicons', 'Generate glyphicons if needed', function() {
    var getThemeConfig = require('./lib/get-theme-config')
      , glyphicons = []

    getThemeConfig(grunt, ['path', 'assets', 'glyphicons'], { merge: true } ).forEach(function(src) {
      glyphicons.push(src + '/**/*.svg')
    });

    if (grunt.file.expand(glyphicons).length) {
      var happyplan = grunt.config.get('happyplan');

      // for fist run, if optional checking availability of fontforge
      // then define variable to really execute task
      if (happyplan.glyphicons.build === true) {
        grunt.log.writeln(grunt.template.process("SVG files found. Executing 'webfont:glyphicons'."))
        grunt.task.run('webfont:glyphicons')
      }
      else if(happyplan.glyphicons.build === false) {
        grunt.log.writeln('fontforge not available, `glyphicons` task skipped '.yellow)
      }
      else {
        grunt.log.writeln(grunt.template.process("Checking availability of fontforge before executing 'webfont:glyphicons'."));
        var done = this.async()
        grunt.util.spawn({
          cmd: 'fontforge',
          args: ['--version']
        }, function (err, result, code) {
          happyplan.glyphicons.build = !(code === 127)
          happyplan = grunt.config.set('happyplan', happyplan)
          grunt.task.run('happyplan:glyphicons')
          done()
        });
      }
    }
    else {
      grunt.log.writeln(grunt.template.process("No SVG file found. Skipping 'webfont:glyphicons'.").yellow)
    }
  })
}
