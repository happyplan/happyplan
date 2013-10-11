module.exports = function(grunt) {
  "use strict";

  return {
    styles: {
      expand: true,
      flatten: true,
      src: '<%= happyplan.path.dist.assets.styles %>/*.css',
      dest: '<%= happyplan.path.dist.assets.styles %>/'
    }
  }
}
