/*global module*/
module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  grunt.registerTask('happyplan:install-theme', 'Download & install a happy plan theme from Bower', function () {
      var themeName = grunt.option('theme');
      if (!themeName) {
        grunt.fail('Theme name is required');
      }
      
      themeName = grunt.util._.unquote(themeName);
      var error = false;
      require('bower')
        .commands
        .install([themeName])
        .on('error', function() {
          grunt.fail('➤ Error during installation of "' + themeName + '" theme.');
          error = true;
        })
        .on('end', function () {
          if(!error) {
            grunt.log.writeln('➤ "' + themeName + '" installed.');
          }
        });
  });

  grunt.registerTask('happyplan:activate-theme', 'Activate a theme', function () {
    // @todo
    // change happyplan.json@theme.parent value
  });
};
