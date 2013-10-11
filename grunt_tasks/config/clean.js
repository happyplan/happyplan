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
    dist: {
      src: ['<%= happyplan.path.dist._ %>']
    },
    build: {
      src: ['<%= happyplan.path.build._ %>']
    },
    jekyll: {
      src: ['<%= happyplan.path.build.jekyll.src %>']
    }
  }
}
