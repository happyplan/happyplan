/* globals module:true require:true */
module.exports = function(grunt) {

  var deepmerge = require('deepmerge');
  var path = require('path');

  try {
    var pkg = grunt.file.readJSON('package.json');
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
  
  // missing helper for parameters
  // until _.unquote (grunt.util._.unquote) is ok
  // https://github.com/epeli/underscore.string/pull/162
  grunt.util._.unquote = function unquote(str) {
    if (str.indexOf('"') === 0 && str.lastIndexOf('"') === str.length-1
      || str.indexOf("'") === 0 && str.lastIndexOf("'") === str.length-1) {
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

  grunt.verbose.writeln('Runtime config', happyplan);

  // imports our tasks
  // (we must change cwd because of how loadNpmTasks works)
  process.chdir(happyplan._);
  // load devDependencies if we are using grunt from happyplan source directory
  require('matchdep')[ happyplan.cwd !== happyplan._ ? 'filter' : 'filterAll']('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadTasks('tasks');
  // reset cwd to previous value
  process.chdir(happyplan.cwd);

  // load themes tasks
  for (var key in happyplan.theme) {
    if (happyplan.theme[key].path && happyplan.theme[key].path.tasks) {
      grunt.loadTasks(happyplan.theme[key].path.tasks);
    }
  }

  // prepare config for copy task for theme
  // by default, get default theme
  var themesCopyTask = {}; // all copy tasks
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
          themesCopyTask[taskKey] = {files: [{
            expand: true,
            cwd: src,
            src: ['**'],
            dest: dest
          }]};
          prepareBuild_Tasks[objKey].push('copy:' + taskKey);
        }
      }
      var staticKey = 'th_' +themeKey + '-' + objKey + '--' + 'static';
      themesCopyTask[staticKey] = {files: [{
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
  themesCopyTask['th_local-html--posts'] = {files: [{
    expand: true,
    cwd: '<%= happyplan.theme.local.posts %>',
    src: ['**'],
    dest: '<%= happyplan.build.jekyll.src %>/_posts'
  }]};
  prepareBuild_Tasks.html.push('copy:th_local-html--posts');

  // register preparation task for the entire html tree
  grunt.registerTask('happyplan:prepare-build-html', prepareBuild_Tasks.html);
  grunt.registerTask('happyplan:prepare-build-assets', prepareBuild_Tasks.assets);
  
  // clean theme paths
  // this done here because in files section using minimatch & exclude pattern,
  // paths not normalized don't match correctly
  // ex: include /bla/./bla/**/*, exclude /bla/./bla/**/_* don't work as expected
  for (var themeKey in happyplan.theme) {
    ["html", "assets"].forEach(function(type) {
      if (happyplan.theme[themeKey][type]) {
        for (var childType in happyplan.theme[themeKey][type]) {
          happyplan.theme[themeKey][type][childType] = path.normalize(grunt.template.process(happyplan.theme[themeKey][type][childType], { data: { happyplan: happyplan}}));
        }
      }
    });
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

  // register scripts for JS engine
  happyplan.grunt.scripts = happyplan.assets.scripts ? {
    options: {
      banner: "<%= happyplan.assets.banner %>"
    },
    
    // skip scripts that don't have source (eg: jquery from cdn)
    files: happyplan.assets.scripts.filter(function(value, i) {
      return value.dest && value.src;
    })
  } : {};

  // grunt configuration
  grunt.initConfig({
    happyplan: happyplan,

    jshint: happyplan.grunt.jshint,

    // remove folders and files
    clean: {
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
    },

    // static file generator
    jekyll: {
      compile: {
        config: '<%= happyplan.build.jekyllConfig %>'
      }
    },

    // Copy folders and files
    copy: grunt.util._.extend({}, themesCopyTask, {
      cssAsScss: {
        files: [{
          expand: true,
          cwd: '<%= happyplan.bower_components %>',
          src: ['**/*.css'],
          dest: '<%= happyplan.bower_components %>',
          filter: 'isFile',
          ext:    ".scss"
        }]
      },
      
      'jekyll-dist': {
        files: [{
          expand: true,
          cwd: '<%= happyplan.build.jekyll.dist %>',
          src: ['**', '**/.*'],
          dest: '<%= happyplan.dist._ %>'
        }]
      },

      images: {
        files: [{
          expand: true,
          cwd: '<%= happyplan.build.assets.images %>',
          src: '<%= happyplan.assets.images.src %>',
          dest: '<%= happyplan.dist.assets.images %>'
        }]
      }
    }),

    // concat scripts
    concat: {
      scripts_dev: deepmerge(happyplan.grunt.scripts, happyplan.grunt.concat || {})
    },

    // minify javascript
    uglify: {
      // just merge hp options correctly
      scripts_dist: deepmerge(happyplan.grunt.scripts, happyplan.grunt.uglify || {})
    },

    webfont: {
      glyphicons: {
        src: '<%= happyplan.build.assets.glyphicons %>/*.svg',
        dest: '<%= happyplan.dist.assets.fonts %>',
        destCss: '<%= happyplan.theme.local.assets.styles %>',
        options: {
            relativeFontPath: require('path').relative(
              // we must process template here because it's not already done by the grunt.init at this time
              // PR if u have a better solution :)
              __dirname + '/' + grunt.template.process('<%= happyplan.dist.assets.styles %>', { data: { happyplan: happyplan}}),
              __dirname + '/' + grunt.template.process('<%= happyplan.dist.assets.fonts %>', { data: { happyplan: happyplan}})
            ),
            stylesheet: 'scss',
            hashes: false,
            htmlDemo: false
        }
      }
    },

    // time to have some styles!
    compass: {
      options: {
        config: '<%= happyplan.build.compassConfig %>'
      },
      dev: {
        options: {
          outputStyle: 'expanded',
          noLineComments: false,
          debugInfo: true
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          noLineComments: true
        }
      }
    },

    // optimize images
    // just  write over files because there are already copies
    imagemin: {
      dist: {
        options: happyplan.imagemin,
        files: [{
          expand: true,
          cwd: "<%= happyplan.dist.assets.images %>",
          src: ["**/*"],
          dest: "<%= happyplan.dist.assets.images %>"
        },
        {
          expand: true,
          cwd: "<%= happyplan.dist.media %>",
          src: ["**/*"],
          dest: "<%= happyplan.dist.media %>"
        }]
      }
    },

    // static server
    connect: {
      server: {
        options: {
          port: '<%= happyplan.localhost.port %>',
          base: '<%= happyplan.dist._ %>/',
          hostname: '', // Must be empty to be accessible everywhere and not only "localhost"
          middleware: function(connect, options) {
            return [
              require('connect-livereload')({
                excludeList: ['.scss']
              }),
              // Default middlewares
              // Serve static files.
              connect.static(options.base),
              // Make empty directories browsable.
              connect.directory(options.base)
            ];
          }
        }
      }
    },

    // open in browser
    open : {
      dev : {
        path: 'http://<%= happyplan.localhost.hostname %>:<%= happyplan.localhost.port %>/'
      }
    },

    watch: {
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
            '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets._ %>'
          ],
          tasks: ['happyplan:prepare-build-html', 'happyplan:build-html']
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
          tasks: ['copy:th_local-assets--styles', 'compass:dev']
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
    },

    'gh-pages': {
      options: {
        base: '<%= happyplan.dist._ %>',
        branch: '<%= happyplan.git.branch %>'
      },
      src: ['**/*']
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // public commands
  grunt.registerTask('happyplan:dev',     ['jshint', 'happyplan:build']);
  grunt.registerTask('happyplan:dist',    ['jshint', 'happyplan:build', 'imagemin:dist']);

  //happyplan: == default
  grunt.registerTask('happyplan:default', ['happyplan:dev', 'connect:server', 'open:dev', 'watch']);

  // test
  grunt.registerTask('test', ['clean:test_sandbox', 'nodeunit']);
};
