// optimize images
// just  write over files because there are already copies
module.exports = function(grunt) {
  "use strict";

  return {
    dist: {
      options: '<%= happyplan.imagemin %>',
      files: [{
        expand: true,
        cwd: "<%= happyplan.path.dist.assets.images %>",
        src: ["**/*"],
        dest: "<%= happyplan.path.dist.assets.images %>"
      },
      {
        expand: true,
        cwd: "<%= happyplan.path.dist.media %>",
        src: ["**/*"],
        dest: "<%= happyplan.path.dist.media %>"
      }]
    }
  }
}
