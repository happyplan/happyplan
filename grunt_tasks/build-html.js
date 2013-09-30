module.exports = function(grunt, happyplan) {
  "use strict";

  var env = grunt.option('env');

  grunt.registerTask('happyplan:build-html', 'Build the html for the website', [
    //'assemble:html'
    'clean:jekyll',
    'happyplan:prepare-build-html', // created in Gruntfile
    'happyplan:config-jekyll',
    'jekyll:' + env,
    'copy:jekyll-dist'
  ])
}
