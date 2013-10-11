module.exports = function getThemes(grunt, reverseOrder, raw) {
  "use strict";

  reverseOrder = reverseOrder === undefined ? true : reverseOrder;
  raw = raw === undefined ? false : raw;
  var happyplan = grunt.config[raw ? 'getRaw' : 'get']('happyplan')
    , theme = happyplan
    , themes = {
      'local': happyplan
    }
    , stupidityLimit = 20
    , stupidityChecker = 0

  while(theme.parent) {
    if (!happyplan.theme[theme.parent]) {
      grunt.fail.warn("Specified parent theme '" + theme.parent + "' doesn't exist")
    }
    themes[theme.parent] = happyplan.theme[theme.parent]
    theme = themes[theme.parent]

    // prevent stupid infinite loop
    if (++stupidityChecker > stupidityLimit) {
      grunt.fail.warn("Your theme have more than " + stupidityLimit + " parents, stupidity limit reached. If you really need that, please kill yourself.")
    }
  }

  if (reverseOrder) {
    // now reverse object to have logic order when playing with files
    var orderedThemes = {}

    Object.keys(themes).reverse().forEach(function(key) {
      orderedThemes[key] = themes[key]
    })

    themes = orderedThemes
  }

  return themes
}
