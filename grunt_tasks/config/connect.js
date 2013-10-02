module.exports = function(grunt) {
  "use strict";

  return {
    server: {
      options: {
        port: '<%= happyplan.server.port %>',
        base: '<%= happyplan.dist._ %>/',
        hostname: '', // Must be empty to be accessible everywhere and not only "localhost"
        middleware: function(connect, options) {
          return [
            require('connect-livereload')(),
            // Default middlewares
            // Serve static files.
            connect.static(options.base),
            // Make empty directories browsable.
            connect.directory(options.base)
          ];
        }
      }
    }
  }
}
