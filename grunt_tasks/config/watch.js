module.exports = function(grunt, happyplan) {
  "use strict";

  return {
    options: {
       // check status of https://github.com/gruntjs/grunt-contrib-watch/pull/125
       // to see if we can remove "<%= happyplan.cwd %>/" in files section
       // & change cwd below with the new option
       // but if this PR is just closed, we don't really care because it's working
       cwd: happyplan._
    },
    html: {
        files: [
          '<%= happyplan.cwd %>/<%= happyplan.theme.local.posts %>/**/*',
          '<%= happyplan.cwd %>/<%= happyplan.theme.local.html._ %>/**/*',
          '<%= happyplan.cwd %>/<%= happyplan.theme.local.html._ %>/**/.*',
          '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets._ %>/**/*'
        ],
        tasks: ['happyplan:prepare-build-html', 'happyplan:build-html']
        //tasks: ['build-html']
    },
    staticAssets: {
        files: [
          '<%= happyplan.cwd %>/<%= happyplan.theme.local.assets._ %>/**/*',
          '<%= happyplan.cwd %>/<%= happyplan.theme.local.assets._ %>/**/_*',
          '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.styles %>',
          '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.styles %>/**/*',
          '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.scripts %>',
          '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.scripts %>/**/*',
          '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.images %>',
          '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.images %>/**/*',
          '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.glyphicons %>',
          '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.glyphicons %>/**/*'
        ],
        tasks: ['copy:th_local-assets--static']
    },
    js: {
        files: ['<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.scripts %>/**/*.*'],
        tasks: ['copy:th_local-assets--scripts', 'concat:scripts_dev']
    },
    scss: {
        files: ['<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.styles %>/**/*.*'],
        tasks: ['copy:th_local-assets--styles', 'compass:dev', 'autoprefixer']
    },
    images: {
        files: ['<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.images %>/**/*.*'],
        tasks: ['copy:th_local-assets--images', 'copy:images']
    },
    glyphicons: {
        files: ['<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.glyphicons %>/*.svg'],
        tasks: ['copy:th_local-assets--glyphicons', 'happyplan:glyphicons']
    },
    livereload: {
        options: {
          livereload: true
        },
        files: ['<%= happyplan.cwd %>/<%= happyplan.dist._ %>/**/*.*'],
        tasks: []
    }
  }
}
