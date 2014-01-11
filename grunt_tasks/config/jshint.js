module.exports = function(grunt) {
  "use strict";

  var options = {
    reporter: require('jshint-stylish')
  }

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
    engine: [
      "<%= happyplan.path.html.helpers %>/**/*.js",
      "<%= happyplan.path.html.plugins %>/**/*.js"
    ],
    scripts: [
      "<%= happyplan.path.assets.scripts %>/**/*.js",
      "!<%= happyplan.path.assets.scripts %>/lib/**/*"
    ]
  }
}
