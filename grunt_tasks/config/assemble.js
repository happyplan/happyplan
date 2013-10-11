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
      layoutdir: '<%= happyplan.path._ %>/layouts',
      partials: '<%= happyplan.path._ %>/partials/*.html',
      layout: 'default.html',
      assets: '<%= happyplan.path._ %>/assets',
    },
    html: {
      src: [
        '<%= happyplan.path._ %>/content/**/*.html',
        '<%= happyplan.path._ %>/content/**/*.md'
      ],
      dest: '<%= happyplan.path.dist %>/'
    }
  }
}
