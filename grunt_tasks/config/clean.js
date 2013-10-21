module.exports = function(grunt) {
  "use strict";

  return {
    test_sandbox: {
      src: [
        'test/**/.DS_Store',
        'test/sandbox/**/*',
        '!test/sandbox/package.json'
      ]
    },
    test_builds: {
      src: ['test/**/<%= happyplan.path.build._ %>']
    },
    dist: {
      src: ['<%= happyplan.path.dist._ %>']
    },
    build: {
      src: ['<%= happyplan.path.build._ %>']
    }
  }
}
