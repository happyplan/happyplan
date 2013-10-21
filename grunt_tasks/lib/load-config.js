module.exports = function loadConfig(grunt, happyplanRoot) {
  "use strict";

  var deepmerge = require('deepmerge')

  if (grunt.option('env') === undefined) {
    // force "dist" env if dist or publish tasks are called.
    process.argv.forEach(function(value) {
      if (value == 'happyplan:dist' || value == 'happyplan:publish') {
        grunt.option('env', 'dist')
      }
    });
    // if env is still undefined, set it to 'dev'
    if (grunt.option('env') === undefined) {
      grunt.option('env', 'dev')
    }
  }

  // (happyplan default first, parents, & the local)
  var happyplan = deepmerge(grunt.config.get('pkg'), grunt.file.readJSON(happyplanRoot + '/happyplan.json'))

  happyplan.env = grunt.option('env')
  grunt.verbose.writeln('Environnment is'.grey, happyplan.env)

  happyplan.cwd = process.cwd()
  grunt.verbose.writeln('CWD is'.grey, happyplan.cwd.cyan)

  happyplan._ = happyplanRoot
  grunt.verbose.writeln('happyplan wd is'.grey, happyplan._.cyan)

  happyplan.pkg = grunt.file.readJSON(happyplanRoot + '/package.json')

  // load bower config
  happyplan.bower_components = require('bower').config.directory

  grunt.config.set('happyplan', happyplan)
}
