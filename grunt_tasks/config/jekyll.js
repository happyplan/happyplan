// static file generator
module.exports = function(grunt, happyplan) {
  "use strict";

  return {
    options: {
      config: '<%= happyplan.build.jekyllConfig %>'
    },
    dev: {
      options: {
        drafts: true,
        future: true
      },
    },
    dist: {}
  }
}
