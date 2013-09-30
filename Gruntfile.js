module.exports = function(grunt) {
  "use strict";

  var deepmerge = require('deepmerge')
    , path = require('path')
    , pkg

  try {
    pkg = grunt.file.readJSON('package.json');
  }
  catch(e) {
    throw "'package.json' is required. Check the file exist & make sure it's readable by happyplan";
  }

  if (grunt.option('env') === undefined) {
    // force "dist" env if dist or publish tasks are called.
    process.argv.forEach(function(value) {
      if (value == 'happyplan:dist' || value == 'happyplan:publish') {
        grunt.option('env', 'dist');
      }
    });
    // if env is still undefined, set it to 'dev'
    if (grunt.option('env') === undefined) {
      grunt.option('env', 'dev');
    }
  }
  grunt.verbose.writeln('Environnment is'.grey, grunt.option('env').cyan);

  grunt.verbose.writeln('CWD is'.grey, process.cwd().cyan);
  grunt.verbose.writeln('Real wd is'.grey, __dirname.cyan);

  // (happyplan default first, parents, & the local)
  var happyplan = deepmerge(pkg, grunt.file.readJSON(__dirname + '/happyplan.json'));
  happyplan.cwd = process.cwd();
  happyplan._ = __dirname;

  happyplan.env = grunt.option('env');
  happyplan.pkg = grunt.file.readJSON(__dirname + '/package.json')

  // Init Grunt right now, to get pkg & happyplan in template ASAP
  grunt.config.init({
    pkg: pkg,
    happyplan: happyplan,
  })

  // missing helper for parameters
  // until _.unquote (grunt.util._.unquote) is ok
  // grunt.util._ will be deprecated in grunt 0.5.x
  // we need to include our own underscore.string
  grunt.util._.unquote = function unquote(str) {
    if (str.indexOf('"') === 0 && str.lastIndexOf('"') === str.length-1 ||
        str.indexOf("'") === 0 && str.lastIndexOf("'") === str.length-1) {
      return str.slice(1,str.length-1);
    }
    return str;
  }

  // load bower config
  var bower = require('bower');
  happyplan.bower_components = bower.config.directory;

  var localConfigPath = 'happyplan.json';
  if (grunt.file.exists(localConfigPath)) {
    mergeConfig(localConfigPath, 'local');
  }

  function mergeConfig(file, key) {
    if (!grunt.file.exists(file)) {
      throw "Unable to load theme config:" + file + ". Is it installed ?";
    }

    var themeConfig = grunt.file.readJSON(file);
    // check if there is a parent theme
    if (themeConfig.theme && themeConfig.theme[key] && themeConfig.theme[key].parent) {
      grunt.verbose.writeln('Merging configuration theme ' + themeConfig.theme[key].parent.cyan);
      mergeConfig(happyplan.cwd + '/' + happyplan.bower_components + '/' + themeConfig.theme[key].parent + '/happyplan.json', themeConfig.theme[key].parent);
    }

    // merged after loading parent config so the merge is done with local config merged last
    happyplan = deepmerge(happyplan, themeConfig);

    // edit/create theme base path to be clear
    if (happyplan.theme && happyplan.theme[key] && !happyplan.theme[key]._) {
      happyplan.theme[key]._ = happyplan.bower_components + '/' + key;
    }
  }

  // just ensure local is latest key
  var localTmp = happyplan.theme.local;
  delete happyplan.theme.local;
  happyplan.theme.local = localTmp;

  //grunt.verbose.writeln('Runtime config', happyplan);

  // load themes tasks
  for (var key in happyplan.theme) {
    if (happyplan.theme[key].path && happyplan.theme[key].path.tasks) {
      grunt.loadTasks(happyplan.theme[key].path.tasks);
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
    src: ['**'],
    dest: '<%= happyplan.build.jekyll.src %>/_posts'
  }]};
  prepareBuild_Tasks.html.push('copy:th_local-html--posts');
  happyplan.themesCopyTask['th_local-html--posts_drafts'] = {files: [{
    expand: true,
    cwd: '<%= happyplan.theme.local.posts_drafts %>',
    src: ['**'],
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

  // create some variables for html engine
  ["styles", "scripts"].forEach(function(type) {
    for (var data in happyplan.assets[type]) {
      happyplan.assets[type][data].hook = happyplan.assets[type][data].hook ? happyplan.assets[type][data].hook : happyplan.assets.default_hook[type];
      if (happyplan.assets[type][data].ifIE) {
        happyplan.html.hooks[happyplan.assets[type][data].hook] += '<!--[if ' + (typeof happyplan.assets[type][data].ifIE === 'string' ? happyplan.assets[type][data].ifIE : 'IE') + ']>'
      }
      happyplan.html.hooks[happyplan.assets[type][data].hook] += grunt.template.process(happyplan.html.helpers[type], {
        data: grunt.util._.extend({}, happyplan.assets[type][data], {
          happyplan: happyplan,
          dest: (grunt.template.process(happyplan.assets[type][data].dest, {data: {happyplan:happyplan}}) + (happyplan.env == 'dist' && happyplan.cachebuster ? '?' + happyplan.cachebuster : '' ))
            .replace(
              grunt.template.process(happyplan.dist.assets[type], {data: {happyplan:happyplan}}),
              grunt.template.process(happyplan.baseUrls[type], {data: {happyplan:happyplan}})
            )
        })
      });
      if (happyplan.assets[type][data].ifIE) {
        happyplan.html.hooks[happyplan.assets[type][data].hook] += '<![endif]-->';
      }
      happyplan.html.hooks[happyplan.assets[type][data].hook] += "\n";
    }
  });

  // update happyplan
  grunt.config.set('happyplan', happyplan);

  var taskFolder = grunt.template.process(happyplan.theme.default.tasks)
  require(taskFolder + '/lib/configloader')(taskFolder + '/config/', grunt, happyplan)
  //console.log(grunt.config.get('jshint'));

  // imports tasks
  // (we must change cwd because of how loadNpmTasks works)
  process.chdir(happyplan._);
  // dev dep only...
  //https://github.com/sindresorhus/load-grunt-tasks/issues/7
  //require('load-grunt-tasks')(grunt)
  // load devDependencies if we are using grunt from happyplan source directory
  require('matchdep')[ happyplan.cwd !== happyplan._ ? 'filter' : 'filterAll']('grunt-*').forEach(grunt.loadNpmTasks);
  //grunt.loadNpmTasks('assemble') // not handled by load-grunt-tasks
  grunt.loadTasks(taskFolder)
  // reset cwd to previous value
  process.chdir(happyplan.cwd);
}
