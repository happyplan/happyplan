module.exports = function(grunt) {
  "use strict";

  // Execute or skip 'webfont:glyphicons' depending of the presence of SVG files in the '<%= happyplan.path.assets.glyphicons %>' folder.
  grunt.registerTask('happyplan:glyphicons', 'Generate glyphicons if needed', function() {
    if (grunt.file.expand(grunt.template.process('<%= happyplan.path.build.assets.glyphicons %>/*.svg')).length) {
      grunt.log.writeln(grunt.template.process("SVG files in '<%= happyplan.path.build.assets.glyphicons %>'. Executing 'webfont:glyphicons'."))
      grunt.task.run('webfont:glyphicons')
    }
    else {
      grunt.log.writeln(grunt.template.process("No SVG file in '<%= happyplan.path.build.assets.glyphicons %>'. Skipping 'webfont:glyphicons'.").yellow)
    }
  })
}
