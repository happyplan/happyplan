module.exports = function(grunt, happyplan) {
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
      "happyplan.json",
      "<%= happyplan.theme.local.tasks %>/**/*.js"
    ],
    scripts: [
      "<%= happyplan.theme.local.assets.scripts %>/**/*.js",
      "!<%= happyplan.theme.local.assets.scripts %>/lib/**/*"
    ]
  }
}
