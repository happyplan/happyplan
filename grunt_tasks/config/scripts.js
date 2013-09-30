module.exports = function(grunt, happyplan) {
  "use strict";

  return happyplan.assets.scripts ? {
    options: {
      banner: "<%= happyplan.assets.banner %>"
    },

    // skip scripts that don't have source (eg: jquery from cdn)
    files: happyplan.assets.scripts.filter(function(value, i) {
      return value.dest && value.src;
    })
  } : {}
}
