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
      src: ['<%= happyplan.dist._ %>']
    },
    build: {
      src: ['<%= happyplan.build._ %>']
    },
    jekyll: {
      src: ['<%= happyplan.build.jekyll.src %>']
    }
  }
}
