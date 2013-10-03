module.exports = function(grunt) {
  "use strict";

  return {
    options: {
      pkg: '<%= pkg %>',
      happyplan: '<%= happyplan %>',
      flatten: true,
      // Load prettify helper from node_modules.
      //helpers: ['<%= _.loadDev("helper-*") %>'],
      prettify: {
        condense: true,
        indent_scripts: 'keep'
      },
      layoutdir: '<%= happyplan.src %>/layouts',
      partials: '<%= happyplan.src %>/partials/*.html',
      layout: 'default.html',
      assets: '<%= happyplan.src %>/assets',
    },
    html: {
      src: [
        '<%= happyplan.src %>/content/**/*.html',
        '<%= happyplan.src %>/content/**/*.md'
      ],
      dest: '<%= happyplan.dist %>/'
    }
  }
}
