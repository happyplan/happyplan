module.exports = function(grunt, happyplan) {
  "use strict";

  grunt.registerTask('happyplan:publish', "Publish your website", [
    'happyplan:dist',
    'gh-pages'
  ]
    //function() {
      // @todo
      // call
      // grunt-release for bumping version
      // & grunt:publish if it's for gh-pages || something else for ftp like
    //});
  )
}
