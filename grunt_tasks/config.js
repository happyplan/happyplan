module.exports = function(grunt) {
  "use strict";

  grunt.registerTask('happyplan:config-jekyll', 'Generate Jekyll config file', function () {
    var jsYaml = require('js-yaml');
    var jekyllConfig = grunt.config.get(['happyplan','jekyll']);
    var configFile = grunt.config.get(['happyplan','path', 'build', 'jekyllConfig']);

    jekyllConfig.happyplan = grunt.config.get(['happyplan']);
    // remove myself
    delete jekyllConfig.happyplan.jekyll;

    grunt.file.write(configFile, jsYaml.dump(jekyllConfig));
    grunt.log.writeln('Jekyll configuration file created: '.grey + configFile.cyan);
  });

  grunt.registerTask('happyplan:configs', 'Generate required config files', [
    'happyplan:config-jekyll'
  ]);
};
