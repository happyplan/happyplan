module.exports = function(grunt) {
  "use strict";

  grunt.registerTask('happyplan:publish', "Publish your website", [
      'happyplan:dist'
    , 'gh-pages'
  ])
}
