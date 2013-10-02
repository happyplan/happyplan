module.exports = function(grunt) {
  "use strict";

  return {
    options: {
      base: '<%= happyplan.dist._ %>',
      branch: '<%= happyplan.git.branch %>'
    },
    src: ['**/*']
  }
}
