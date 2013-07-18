/* globals module:true require:true */
module.exports = function(grunt) {

  var deepmerge = require('deepmerge');

  var pkg = grunt.file.readJSON(__dirname + '/package.json');

  // set option
  grunt.option('env', typeof grunt.option('env') !== 'undefined' ? grunt.option('env') : 'dev');
  grunt.verbose.writeln('Environnment is'.grey, grunt.option('env').cyan);
  grunt.verbose.writeln('CWD is'.grey, process.cwd().cyan);
  grunt.verbose.writeln('Real wd is'.grey, __dirname.cyan);

  // (happyplan default first, parents, & the local)
  var happyplan = grunt.file.readJSON(__dirname + '/happyplan.json');
  happyplan.cwd = process.cwd();
  happyplan._ = __dirname;

  happyplan.env = grunt.option('env');
  
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
  var cwd = process.cwd();
  process.chdir(__dirname);
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadTasks('tasks');
  // reset cwd to previous value
  process.chdir(cwd);

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
      "layouts": "<%= happyplan.build.jekyll %>/_layouts",
      "partials": "<%= happyplan.build.jekyll %>/_includes",
      "plugins": "<%= happyplan.build.jekyll %>/_plugins",
      "pages": "<%= happyplan.build.jekyll %>"
    },
    "assets": {
      "scripts": "<%= happyplan.build.assets.scripts %>",
      "styles": "<%= happyplan.build.assets.styles %>", // styles -are- *should be* handle by an include path
      "images": "<%= happyplan.build.assets.images %>",
      "fonts": "<%= happyplan.build.assets.fonts %>",
      "glyphicons": "<%= happyplan.build.assets.glyphicons %>"
    }
  };
  // here we (create tasks to) copy each themes files (in order: defaut, parent(s), local)
  // jekyll files. local are copied last to ovewrite previous files
  for (var themeKey in happyplan.theme) {
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
    }

    // handle styles from compass paths to keep cache
    // if (happyplan.theme[themeKey].assets &&
    //     happyplan.theme[themeKey].assets.styles) {
    //   happyplan.compass.additional_import_paths.push(happyplan.theme[themeKey].assets.styles)
    // }
  }

  // add user post & media
  themesCopyTask['th_local-html--posts'] = {files: [{
    expand: true,
    cwd: '<%= happyplan.theme.local.posts %>',
    src: ['**'],
    dest: '<%= happyplan.build.jekyll %>/_posts'
  }]};
  prepareBuild_Tasks.html.push('copy:th_local-html--posts');

  // register preparation task for the entire html tree
  grunt.registerTask('happyplan:prepare-build-html', prepareBuild_Tasks.html);
  grunt.registerTask('happyplan:prepare-build-assets', prepareBuild_Tasks.assets);

  // grunt configuration
  grunt.initConfig({
    pkg: pkg,

    happyplan: happyplan,

    jshint: happyplan.grunt.jshint,

    // remove folders and files
    clean: {
      test_sandbox: {
        src: ['test/sandbox/**/*']
      },
      dist: {
        src: ['<%= happyplan.dist._ %>']
      },
      build: {
        src: ['<%= happyplan.build._ %>']
      },
      jekyll: {
        src: ['<%= happyplan.build.jekyll._ %>']
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

      staticAssets: {
        files: [{
          expand: true,
          cwd: '<%= happyplan.build.assets._ %>',
          src: [
            '**/*',
            '!*/_*',
            '!_*',
            '!_**/*'
          ],
          dest: '<%= happyplan.dist.assets._ %>'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= happyplan.build.assets.images %>',
          src: ['**'],
          dest: '<%= happyplan.dist.assets.images %>'
        }]
      },
      media: {
        files: [{
          expand: true,
          cwd: '<%= happyplan.theme.local.media %>',
          src: ['**'],
          dest: '<%= happyplan.dist.media %>'
        }]
      },

      buildToDist: {
        files: [{
          expand: true,
          cwd: '<%= happyplan.build._ %>',
          src: [
            '**/*',
            '!_*/**'
          ],
          dest: '<%= happyplan.dist._ %>'
        }]
      }
    }),

    // concat scripts
    concat: {
      scripts_dev: deepmerge({
          options: {
            banner: "<%= happyplan.assets.banner %>"
          },
          files: happyplan.assets.scripts
        }, happyplan.grunt.concat || {})
    },

    // minify javascript
    uglify: {
      // just merge hp options correctly
      scripts_dist: deepmerge({
          options: {
            banner: "<%= happyplan.assets.banner %>"
          },
          files: happyplan.assets.scripts
        }, happyplan.grunt.uglify || {})
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
        options: {
          optimizationLevel: 3,
          progressive: true
        },
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
            '<%= happyplan.cwd %>/<%= happyplan.theme.local.html.pages %>/**/*.{html,md,txt,xml}',
          ],
          tasks: ['happyplan:build-html']
      },
      js: {
          files: ['<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.scripts %>/**/*.*'],
          tasks: ['concat:scripts_dev']
      },
      scss: {
          files: ['<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.styles %>/**/*.*'],
          tasks: ['compass:dev']
      },
      staticAssets: {
          files: [
            '<%= happyplan.cwd %>/<%= happyplan.theme.local.assets._ %>/**/*',
            '!<%= happyplan.cwd %>/<%= happyplan.theme.local.assets._ %>/_**/*'
          ],
          tasks: ['copy:staticAssets']
      },
      images: {
          files: ['<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.images %>/**/*.*'],
          tasks: ['copy:images']
      },
      glyphicons: {
          files: ['<%= happyplan.cwd %>/<%= happyplan.theme.local.assets.glyphicons %>/*.svg'],
          tasks: ['happyplan:glyphicons']
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
  grunt.registerTask('happyplan:dist',    ['jshint', 'happyplan:build', 'imagemin:dist']);//, 'clean:build']);

  //happyplan: == default
  grunt.registerTask('happyplan:default', ['happyplan:dev', 'connect:server', 'open:dev', 'watch']);

  // test
  grunt.registerTask('test', ['clean:test_sandbox', 'nodeunit']);
};
