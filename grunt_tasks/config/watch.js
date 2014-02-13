module.exports = function(grunt) {
  "use strict";

  return {
    jsconfig: {
      files: '<%= jshint.config %>',
      tasks: ['jshint:config']
    },
    html: {
      files: [
        '<%= happyplan.cwd %>/<%= happyplan.path.html._ %>/**/*',
        '<%= happyplan.cwd %>/<%= happyplan.path.html.layouts %>/**/*',
        '<%= happyplan.cwd %>/<%= happyplan.path.html.partials %>/**/*',
        '!<%= happyplan.cwd %>/<%= happyplan.path.assets._ %>/**/*'
      ],
      tasks: ['happyplan:build-html']
    },
    html_engine: {
      files: [
        '<%= happyplan.cwd %>/<%= happyplan.path.html.helpers %>/**/*.js',
        '<%= happyplan.cwd %>/<%= happyplan.path.html.plugins %>/**/*.js'
      ],
      tasks: ['happyplan:build-html', 'jshint:engine']
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
      tasks: ['copy:staticFiles']
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
      options:  {
        spawn: false
      },
      files: ['<%= happyplan.cwd %>/<%= happyplan.path.assets.glyphicons %>/*.svg'],
      tasks: ['happyplan:glyphicons', 'happyplan:build-styles']
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
