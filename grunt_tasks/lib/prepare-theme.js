module.exports = function prepareThemes(grunt) {
  "use strict";

  var happyplan = grunt.config.getRaw('happyplan')
  var mergeConfig = require('./merge-config')
  var localConfigPath = happyplan.cwd + '/happyplan.json'
  if (grunt.file.exists(localConfigPath)) {
    happyplan = mergeConfig(localConfigPath, 'local', grunt)
  }

  // just ensure local is latest key
  var localTmp = happyplan.theme.local
  delete happyplan.theme.local
  happyplan.theme.local = localTmp

  //grunt.verbose.writeln('Runtime config', happyplan)

  // load themes tasks
  for (var key in happyplan.theme) {
    if (happyplan.theme[key].path && happyplan.theme[key].path.tasks) {
      grunt.loadTasks(happyplan.theme[key].path.tasks)
    }
  }

  // prepare config for copy task for theme
  // by default, get default theme
  happyplan.themesCopyTask = {}; // all copy tasks
  var themeSrcDest_byRessources = {}; // all resources files {layouts..glyphicons}.src|dest used for watching
  var prepareBuild_Tasks = {}; // all copy tasks names by types (html|assets)
  var availableFilesPerTheme = {
    "html": {
      "layouts": "<%= happyplan.build.jekyll.src %>/_layouts",
      "partials": "<%= happyplan.build.jekyll.src %>/_includes",
      "plugins": "<%= happyplan.build.jekyll.src %>/_plugins"
    },
    "assets": {
      "scripts": "<%= happyplan.build.assets.scripts %>",
      "styles": "<%= happyplan.build.assets.styles %>", // styles -are- *should be* handle by an include path
      "images": "<%= happyplan.build.assets.images %>",
      "fonts": "<%= happyplan.build.assets.fonts %>",
      "glyphicons": "<%= happyplan.build.assets.glyphicons %>"
    }
  };
  var availableStaticFilesPerTheme = {
    "html": "<%= happyplan.build.jekyll.src %>",
    "assets": "<%= happyplan.build.assets._ %>"
  }
  // here we (create tasks to) copy each themes files (in order: defaut, parent(s), local)
  // jekyll files. local are copied last to ovewrite previous files
  for (var themeKey in happyplan.theme) {
    if (happyplan.theme[themeKey].disable) {
      continue;
    }

    for(var objKey in availableFilesPerTheme) {
      if (!prepareBuild_Tasks[objKey]) {
        prepareBuild_Tasks[objKey] = [];
      }
      for(var filesKey in availableFilesPerTheme[objKey]) {
        if (happyplan.theme[themeKey][objKey] &&
            happyplan.theme[themeKey][objKey][filesKey]) {
          var src = happyplan.theme[themeKey][objKey][filesKey];
          var dest = availableFilesPerTheme[objKey][filesKey];
          if (!themeSrcDest_byRessources[filesKey]) {
            themeSrcDest_byRessources[filesKey] = {
              src: [],
              dest: dest // dest is always the same for each types
            };
          }
          themeSrcDest_byRessources[filesKey].src.push(src);
          var taskKey = 'th_' +themeKey + '-' + objKey + '--' + filesKey;
          happyplan.themesCopyTask[taskKey] = {files: [{
            expand: true,
            cwd: src,
            src: ['**'],
            dest: dest
          }]};
          prepareBuild_Tasks[objKey].push('copy:' + taskKey);
        }
      }
      var staticKey = 'th_' +themeKey + '-' + objKey + '--' + 'static';
      happyplan.themesCopyTask[staticKey] = {files: [{
        expand: true,
        cwd: happyplan.theme[themeKey][objKey]._,
        src: [
          '**/*',
          '**/.*',
          '!_*',
          '!_**/*',
          '!**/_*'
        ],
        dest: availableStaticFilesPerTheme[objKey]
      }]};
      prepareBuild_Tasks[objKey].push('copy:' + staticKey);
    }

    // handle styles from compass paths to keep cache
    // if (happyplan.theme[themeKey].assets &&
    //     happyplan.theme[themeKey].assets.styles) {
    //   happyplan.compass.additional_import_paths.push(happyplan.theme[themeKey].assets.styles)
    // }
  }

  // add user post
  happyplan.themesCopyTask['th_local-html--posts'] = {files: [{
    expand: true,
    cwd: '<%= happyplan.theme.local.posts %>',
    src: ['*'],
    dest: '<%= happyplan.build.jekyll.src %>/_posts'
  }]};
  prepareBuild_Tasks.html.push('copy:th_local-html--posts');
  happyplan.themesCopyTask['th_local-html--posts_drafts'] = {files: [{
    expand: true,
    cwd: '<%= happyplan.theme.local.posts_drafts %>',
    src: ['*'],
    dest: '<%= happyplan.build.jekyll.src %>/_drafts'
  }]};
  prepareBuild_Tasks.html.push('copy:th_local-html--posts_drafts');

  // register preparation task for the entire html tree
  grunt.registerTask('happyplan:prepare-build-html', prepareBuild_Tasks.html);
  grunt.registerTask('happyplan:prepare-build-assets', prepareBuild_Tasks.assets);

  // clean theme paths
  // this done here because in files section using minimatch & exclude pattern,
  // paths not normalized don't match correctly
  // ex: include /bla/./bla/**/*, exclude /bla/./bla/**/_* don't work as expected
  var path = require('path')
  var cleanPath = function(type) {
    if (happyplan.theme[thKey][type]) {
      for (var childType in happyplan.theme[thKey][type]) {
        happyplan.theme[thKey][type][childType] = path.normalize(grunt.template.process(happyplan.theme[thKey][type][childType], { data: { happyplan: happyplan}}));
      }
    }
  }
  for (var thKey in happyplan.theme) {
    ["html", "assets"].forEach(cleanPath);
  }
}
