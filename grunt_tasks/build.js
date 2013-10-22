module.exports = function(grunt) {
  "use strict";

  var env = grunt.option('env');

  grunt.registerTask('happyplan:build', 'Build the website', [
      // clean everything
      'clean:build'
    , 'clean:dist'

    // run static generator
    , 'happyplan:build-html'

    // happy plan flavor
    , 'happyplan:build-assets'

    // copy static files at the end to be sure to copy "generated static" files
    // (eg: fonts/icons.* are generated but generation is optional
    // so required as source because not changed often)
    , 'copy:staticFiles'
  ])
}
