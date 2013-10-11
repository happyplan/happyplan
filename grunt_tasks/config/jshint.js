module.exports = function(grunt) {
  "use strict";

  var options = {}

  if (grunt.file.exists('.jshintrc')) {
    options.jshintrc = ".jshintrc"
  }

  return {
    options: options,
    config: [
      ".jshintrc",
      "*.js",
      "*.json",
      "happyplan.json"
    ],
    scripts: [
      "<%= happyplan.path.assets.scripts %>/**/*.js",
      "!<%= happyplan.path.assets.scripts %>/lib/**/*"
    ]
  }
}
