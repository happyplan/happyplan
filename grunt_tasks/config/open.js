module.exports = function(grunt, happyplan) {
  "use strict";

  return {
    server: {
      path: 'http://<%= happyplan.server.hostname %>:<%= happyplan.server.port %>/'
    }
  }
}
