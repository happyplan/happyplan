module.exports = function(grunt) {
  "use strict";

  return {
    styles: {
      options: {
        includePaths: [
          './bower_components'
        ],
      },
      files: {
        '<%= happyplan.dist %>/assets/styles/putaindecode.css': '<%= happyplan.src %>/assets/styles/putaindecode.scss'
      }
    }
  }
}
