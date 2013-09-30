module.exports = function(grunt, happyplan) {
  "use strict";

  return {
    options: {
      base: '<%= happyplan.dist._ %>',
      branch: '<%= happyplan.git.branch %>'
    },
    src: ['**/*']
  }
}
