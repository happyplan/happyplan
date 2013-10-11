module.exports = function(grunt) {
  "use strict";

  return {
    options: {
       // check status of https://github.com/gruntjs/grunt-contrib-watch/pull/125
       // to see if we can remove "<%= happyplan.cwd %>/" in files section
       // & change cwd below with the new option
       // but if this PR is just closed, we don't really care because it's working
       cwd: '<%= happyplan._ %>'
    },
    html: {
        files: [
          '<%= happyplan.cwd %>/<%= happyplan.path.posts %>/**/*',
          '<%= happyplan.cwd %>/<%= happyplan.path.posts_drafts %>/**/*',
          '<%= happyplan.cwd %>/<%= happyplan.path.html._ %>/**/*',
          '<%= happyplan.cwd %>/<%= happyplan.path.html._ %>/**/.*',
          '!<%= happyplan.cwd %>/<%= happyplan.path.assets._ %>/**/*'
        ],
        tasks: ['happyplan:prepare-build-html', 'happyplan:build-html']
        //tasks: ['build-html']
    },
    staticAssets: {
        files: [
          '<%= happyplan.cwd %>/<%= happyplan.path.assets._ %>/**/*',
          '<%= happyplan.cwd %>/<%= happyplan.path.assets._ %>/**/_*',
          '!<%= happyplan.cwd %>/<%= happyplan.path.assets.styles %>',
          '!<%= happyplan.cwd %>/<%= happyplan.path.assets.styles %>/**/*',
          '!<%= happyplan.cwd %>/<%= happyplan.path.assets.scripts %>',
          '!<%= happyplan.cwd %>/<%= happyplan.path.assets.scripts %>/**/*',
          '!<%= happyplan.cwd %>/<%= happyplan.path.assets.images %>',
          '!<%= happyplan.cwd %>/<%= happyplan.path.assets.images %>/**/*',
          '!<%= happyplan.cwd %>/<%= happyplan.path.assets.glyphicons %>',
          '!<%= happyplan.cwd %>/<%= happyplan.path.assets.glyphicons %>/**/*'
        ],
        tasks: ['copy:th_local-assets--static']
    },
    js: {
        files: ['<%= happyplan.cwd %>/<%= happyplan.path.assets.scripts %>/**/*.*'],
        tasks: ['copy:th_local-assets--scripts', 'concat:scripts_dev']
    },
    scss: {
        files: ['<%= happyplan.cwd %>/<%= happyplan.path.assets.styles %>/**/*.*'],
        tasks: ['happyplan:build-styles']
    },
    images: {
        files: ['<%= happyplan.cwd %>/<%= happyplan.path.assets.images %>/**/*.*'],
        tasks: ['copy:th_local-assets--images', 'copy:images']
    },
    glyphicons: {
        files: ['<%= happyplan.cwd %>/<%= happyplan.path.assets.glyphicons %>/*.svg'],
        tasks: ['copy:th_local-assets--glyphicons', 'happyplan:glyphicons']
    },
    livereload: {
        options: {
          livereload: true
        },
        files: ['<%= happyplan.cwd %>/<%= happyplan.path.dist._ %>/**/*.*'],
        tasks: []
    }
  }
}
