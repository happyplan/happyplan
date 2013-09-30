// optimize images
// just  write over files because there are already copies
module.exports = function(grunt, happyplan) {
  "use strict";

  return {
    dist: {
      options: happyplan.imagemin,
      files: [{
        expand: true,
        cwd: "<%= happyplan.dist.assets.images %>",
        src: ["**/*"],
        dest: "<%= happyplan.dist.assets.images %>"
      },
      {
        expand: true,
        cwd: "<%= happyplan.dist.media %>",
        src: ["**/*"],
        dest: "<%= happyplan.dist.media %>"
      }]
    }
  }
}
