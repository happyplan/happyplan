// time to have some styles!
module.exports = function(grunt) {
  "use strict";

  return {
    options: {
      config: '<%= happyplan.build.compassConfig %>',
      bundleExec: true
    },
    dev: {
      options: {
        outputStyle: 'expanded',
        noLineComments: false,
        debugInfo: true
      }
    },
    dist: {
      options: {
        outputStyle: 'compressed',
        noLineComments: true
      }
    }
  }
}
