module.exports = function(grunt) {
  "use strict";

  return {
    options: {
      base: '<%= happyplan.path.dist._ %>',
      branch: '<%= happyplan.git.branch %>'
    },
    src: ['**/*']
  }
}
