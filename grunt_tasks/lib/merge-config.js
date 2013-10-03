module.exports = function mergeConfig(file, key, grunt) {
  "use strict";

  var deepmerge = require('deepmerge')
    , happyplan = grunt.config.getRaw('happyplan')

  if (!grunt.file.exists(file)) {
    throw "Unable to load theme config:" + file + ". Is it installed ?"
  }

  var themeConfig = grunt.file.readJSON(file)
  // check if there is a parent theme
  if (themeConfig.theme && themeConfig.theme[key] && themeConfig.theme[key].parent) {
    grunt.verbose.writeln('Merging configuration theme ' + themeConfig.theme[key].parent.cyan)
    happyplan = mergeConfig(happyplan.cwd + '/' + happyplan.bower_components + '/' + themeConfig.theme[key].parent + '/happyplan.json', themeConfig.theme[key].parent, grunt)
  }

  // merged after loading parent config so the merge is done with local config merged last
  happyplan = deepmerge(happyplan, themeConfig)

  // edit/create theme base path to be clear
  if (happyplan.theme && happyplan.theme[key] && !happyplan.theme[key]._) {
    happyplan.theme[key]._ = happyplan.bower_components + '/' + key
  }

  grunt.config.set('happyplan', happyplan)
  return happyplan
}
