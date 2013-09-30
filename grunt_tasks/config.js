/*global module*/
module.exports = function(grunt, happyplan) {
  "use strict";

  grunt.registerTask('happyplan:config-jekyll', 'Generate Jekyll config file', function () {
    var jsYaml = require('js-yaml');
    var jekyllConfig = grunt.config.get(['happyplan','jekyll']);
    var configFile = grunt.config.get(['happyplan','build', 'jekyllConfig']);

    jekyllConfig.happyplan = grunt.config.get(['happyplan']);
    // remove myself
    delete jekyllConfig.happyplan.jekyll;

    grunt.file.write(configFile, jsYaml.dump(jekyllConfig));
    grunt.log.writeln('Jekyll configuration file created: '.grey + configFile.cyan);
  });

  grunt.registerTask('happyplan:config-compass', 'Generate Compass config file', function () {
    var themes = grunt.config.get(['happyplan','themes']);
    var config = grunt.config.get(['happyplan','compass']);

    // update include path for stymes
    for (var themeKey in themes) {
      if (themes[themeKey].assets && themes[themeKey].assets.styles &&
          // don't add sass_dir to include path, that's obvious
          themes[themeKey].assets.styles !== config.sass_dir) {

        config.additional_import_paths.unshift(themes[themeKey].assets.styles);
      }
    }

    var dump = [];
    if (config.require) {
      grunt.util._.each(config.require, function(value) {
        dump.push('require "' + value + '"');
      });
      delete config.require;
    }

    grunt.util._.each(config, function(value, key) {
      var line = key + ' = ';
      switch(typeof value) {
      case 'object':
        if (grunt.util._.isArray(value)) {
          line += '["' + value.join('","') + '"]';
        }
        else {
          //@todo ruby hash ? needed ?
          grunt.fail("Objects are not handled yet for the compass config dump. Please report this as issue or code this @todo & make a PR");
        }
        break;
      case 'string':
        line += '"' + value + '"';
      }
      dump.push(line);
    });
    dump = dump.join("\n");

    var configFile = grunt.config.get(['happyplan','build', 'compassConfig']);
    var currentConfig = '';
    try {
      currentConfig = grunt.file.read(configFile);
    }
    catch(e) {}

    // compass forget cache if config file is modified (even just modified datetime)
    // to avoid long compilation time, we just update compass config it's realllly needed
    grunt.log.write('Compass configuration file: '.grey + configFile.cyan);
    if (currentConfig === dump) {
      grunt.log.writeln(' unchanged'.grey);
    }
    else {
      grunt.log.writeln(' updated'.grey);
      grunt.file.write(configFile, dump);
    }
  });

  grunt.registerTask('happyplan:configs', 'Generate required config files', [
    'happyplan:config-jekyll',
    'happyplan:config-compass'
  ]);
};
