module.exports = function taskConfigLoader(grunt, wd) {
  "use strict";
  var path = require('path')
  var happyplan = grunt.config.getRaw('happyplan')
  require('glob').sync('*', {cwd: wd}).forEach(function(file) {
    grunt.config.set(file.replace(/\.js$/,''), require(wd + path.sep + file)(grunt, happyplan))
  })
}
