module.exports = function(path, grunt, happyplan) {
  "use strict";

  require('glob').sync('*', {cwd: path}).forEach(function(file) {
    grunt.config.set(file.replace(/\.js$/,''), require(path + file)(grunt, happyplan))
  })
}
