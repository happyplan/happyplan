module.exports = function(grunt) {
  "use strict";

  return {
    server: {
      path: 'http://<%= happyplan.server.hostname %>:<%= happyplan.server.port %>/'
    }
  }
}
