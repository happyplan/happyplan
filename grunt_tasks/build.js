module.exports = function(grunt, happyplan) {
  "use strict";

  var env = grunt.option('env');

  grunt.registerTask('happyplan:build', 'Build the website', [
    // clean everything
    'clean:build',
    'clean:dist',

    // run static generator
    'happyplan:build-html',

    // happy plan flavor
    'happyplan:build-assets'
  ])
}
