// static file generator
module.exports = function(grunt) {
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
