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
  grunt.verbose.writeln('Environnment is'.grey, grunt.option('env').cyan)
  grunt.verbose.writeln('CWD is'.grey, process.cwd().cyan)
  grunt.verbose.writeln('Real wd is'.grey, happyplanRoot.cyan)

  // (happyplan default first, parents, & the local)
  var happyplan = deepmerge(grunt.config.get('pkg'), grunt.file.readJSON(happyplanRoot + '/happyplan.json'))
  happyplan.cwd = process.cwd()
  happyplan._ = happyplanRoot

  happyplan.env = grunt.option('env')
  happyplan.pkg = grunt.file.readJSON(happyplanRoot + '/package.json')

  // load bower config
  happyplan.bower_components = require('bower').config.directory

  grunt.config.set('happyplan', happyplan)
}
