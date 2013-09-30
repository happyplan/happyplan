module.exports = function(grunt, happyplan) {
  "use strict";

  return {
    styles: {
      expand: true,
      flatten: true,
      src: '<%= happyplan.dist.assets.styles %>/*.css',
      dest: '<%= happyplan.dist.assets.styles %>/'
    }
  }
}
