module.exports = function mergeConfig(file, key, grunt) {
  "use strict";

  var deepmerge = require('deepmerge')
    , happyplan = grunt.config.getRaw('happyplan')

  if (!grunt.file.exists(file)) {
    throw "Unable to load theme config:" + file + ". Is it installed ?"
  }

  var themeConfig = grunt.file.readJSON(file)
    , theme = grunt.util.namespace.get(themeConfig, key)
  // check if there is a parent theme
  if (theme && theme.parent && theme.parent != 'default') {
    grunt.verbose.writeln('Merging configuration theme ' + theme.parent.cyan)
    happyplan = mergeConfig(happyplan.cwd + '/' + happyplan.bower_components + '/' + theme.parent + '/happyplan.json', ['theme', theme.parent], grunt)
  }

  // merged after loading parent config so the merge is done with local config merged last
  happyplan = deepmerge(happyplan, themeConfig)

  // edit/create theme base path to be clear
  var themeKey = key.pop();
  if (theme && !theme._) {
    theme._ = happyplan.bower_components + '/' + themeKey
  }

  grunt.config.set('happyplan', happyplan)
  return happyplan
}
