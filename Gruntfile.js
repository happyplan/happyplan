/* globals module:true require:true */
module.exports = function(grunt) {

  // imports
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('assemble');

  // set option
  grunt.option('env', typeof grunt.option('env') !== 'undefined' ? grunt.option('env') : 'dev');
  grunt.log.writeln('Environnment is'.grey, grunt.option('env').cyan);

  var deepmerge = require('deepmerge');
  
  var happyPlan = grunt.file.readJSON('happy-plan.default.json');
  if (grunt.file.exists('happy-plan.json')) {
    happyPlan = deepmerge(happyPlan, grunt.file.readJSON('happy-plan.json'));
  }
  
  // project configuration
  var pkg = grunt.file.readJSON('package.json');

  // grunt configuration
  grunt.initConfig({

    pkg: pkg,
    happyPlan: happyPlan,
    
    jshint: happyPlan.grunt.jshint,
    
    assemble: {
      options: {
        // pass variables
        __warningComment__: "DO NOT EDIT THIS GENERATED FILE, IT WILL BE OVERWRITTEN AUTOMATICALLY - REFER TO Gruntfile OR configs/*",
        env: grunt.option('env'),
        pkg: pkg,
        happyPlan: happyPlan,
        
        engine: 'handlebars'
      },
      jekyll: {
        options: {
          ext: '.yml'
        },
        files: {
          '<%= happyPlan.build.jekyll._ %>/_config.yml': ['<%= happyPlan.src.configs.jekyll %>']
        }
      },
      compass: {
        options: {
          ext: '.rb',
          require: happyPlan.compass.require.length>0 ? "require \"" + happyPlan.compass.require.join("\"\nrequire \"") + "\"" : "",
          additional_import_paths: happyPlan.compass.additional_import_paths ? ("additional_import_paths = [" + (happyPlan.compass.additional_import_paths.length>0 ? ("\n    \"" + happyPlan.compass.additional_import_paths.join("\",\n    \"") + "\"\n]") : "]")) : ''
        },
        files: {
          'config.rb': ['<%= happyPlan.src.configs.compass %>']
        }
      }
    },

    // open in browser
    open : {
      dev : {
        path: 'http://<%= happyPlan.localhost.hostname %>:<%= happyPlan.localhost.port %>/'
      }
    },

    // server
    connect: {
      server: {
        options: {
          port: '<%= happyPlan.localhost.port %>',
          base: 'dist',
          hostname: '' // Must be empty to be accessible everywhere and not only "localhost"
        }
      }
    },

    // livereload
    livereload: {
      port: 35728
    },

    // remove folders and files
    clean: {
      dist: {
        src: ['<%= happyPlan.dist.path %>']
      },
      build: {
        src: ['<%= happyPlan.build.path %>']
      },
      jekyll: {
        src: ['<%= happyPlan.build.jekyll._ %>']
      }
    },

    // static file generator
    jekyll: {
      compile: {
        config: '<%= happyPlan.build.jekyll._ %>/_config.yml'
      }
    },

    // Copy folders and files
    copy: {
      cssAsScss: {
        files: [{
          expand: true,
          cwd: '<%= happyPlan.src.assets.bower_components %>',
          src: ['**/*.css'],
          dest: '<%= happyPlan.src.assets.bower_components %>',
          filter: 'isFile',
          ext:    ".scss"
        }]
      },
      jekyllBuildToDist: {
        files: [{
          expand: true,
          cwd: '<%= happyPlan.build.jekyll.dest %>',
          src: ['**'],
          dest: '<%= happyPlan.dist.root %>'
        }]
      },
      jekyllPages: {
        files: [{
          expand: true,
          cwd: '<%= happyPlan.src.jekyll.pages %>',
          src: ['**'],
          dest: '<%= happyPlan.build.jekyll._ %>'
        }]
      },
      jekyllPosts: {
        files: [{
          expand: true,
          cwd: '<%= happyPlan.src.jekyll.posts %>',
          src: ['**', '!_*'],
          dest: '<%= happyPlan.build.jekyll._ %>/_posts'
        }]
      },
      jekyllLayouts: {
        files: [{
          expand: true,
          cwd: '<%= happyPlan.src.jekyll.layouts %>',
          src: ['**'],
          dest: '<%= happyPlan.build.jekyll._ %>/_layouts'
        }]
      },
      jekyllPartials: {
        files: [{
          expand: true,
          cwd: '<%= happyPlan.src.jekyll.partials %>',
          src: ['**'],
          dest: '<%= happyPlan.build.jekyll._ %>/_includes'
        }]
      },

      static: {
        files: [{
          expand: true,
          cwd: '<%= happyPlan.src.assets.static %>',
          src: ['**/*', '!**/_*/**'],
          dest: '<%= happyPlan.dist.assets.static %>'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= happyPlan.src.assets.images %>',
          src: ['**'],
          dest: '<%= happyPlan.dist.assets.images %>'
        }]
      },
      medias: {
        files: [{
          expand: true,
          cwd: '<%= happyPlan.src.medias %>',
          src: ['**'],
          dest: '<%= happyPlan.dist.medias %>'
        }]
      },
      root: {
        files: [{
          expand: true,
          cwd: '<%= happyPlan.src.path %>',
          src: ['**/*','!**/_*/**'],
          dest: '<%= happyPlan.dist.root %>'
        }]
      }
    },

    // concat scripts
    concat: {
      dist: deepmerge({
          options: {
            banner: "<%= happyPlan.assets.banner %>"
          },
          files: happyPlan.assets.scripts
        }, happyPlan.grunt.concat || {})
    },

    // minify javascript
    uglify: {
      // just merge hp options correctly
      dist: deepmerge({
          options: {
            banner: "<%= happyPlan.assets.banner %>"
          },
          files: happyPlan.assets.scripts
        }, happyPlan.grunt.uglify || {})
    },
    
    webfont: {
      svgToFonts: {
        src: '<%= happyPlan.src.assets.webfont %>/*.svg',
        dest: '<%= happyPlan.dist.assets.fonts %>',
        destCss: '<%= happyPlan.src.assets.styles %>',
        options: {
            relativeFontPath: require('path').relative(
              // we must process template here because it's not already done by the grunt.init at this time
              // PR if u have a better solution :)
              __dirname + '/' + grunt.template.process('<%= happyPlan.dist.assets.styles %>', { data: { happyPlan: happyPlan}}),
              __dirname + '/' + grunt.template.process('<%= happyPlan.dist.assets.fonts %>', { data: { happyPlan: happyPlan}})
            ),
            stylesheet: 'scss',
            hashes: false,
            htmlDemo: false
        }
      }
    },

    // time to have some styles!
    compass: {
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
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: "<%= happyPlan.dist.assets.images %>",
            src: ["**/*"],
            dest: "<%= happyPlan.dist.assets.images %>"
          },
          {
            expand: true,
            cwd: "<%= happyPlan.dist.medias %>",
            src: ["**/*"],
            dest: "<%= happyPlan.dist.medias %>"
          }
        ]
      }
    },

    // watch
    regarde: {
      configs: {
        files: [
          '<%= happyPlan.src.configs._ %>/*.*',
          '!<%= happyPlan.src.configs.jekyll %>'
        ],
        tasks: ['happyPlan:configs']
      },
      html: {
          files: [
            '<%= happyPlan.src.path %>**/*.{html,md,txt,xml}',
            '<%= happyPlan.src.configs.jekyll %>'
          ],
          tasks: ['jekyll:dist']
      },
      js: {
          files: ['<%= happyPlan.src.assets.scripts %>/**/*.*'],
          tasks: ['concat:dist']
      },
      scss: {
          files: ['<%= happyPlan.src.assets.styles %>/**/*.*'],
          tasks: ['compass:dev']
      },
      static: {
          files: [
            '<%= happyPlan.src.assets.static %>**/*.*',
            '!<%= happyPlan.src.assets.static %>**/_*/**'
          ],
          tasks: ['copy:static']
      },
      images: {
          files: ['<%= happyPlan.src.assets.images %>/**/*.*'],
          tasks: ['copy:images']
      },
      svgToFonts: {
          files: ['<%= happyPlan.src.assets.webfont %>/*.svg'],
          tasks: ['']
      },
      livereload: {
          files: ['<%= happyPlan.dist.path %>**/*.*'],
          tasks: ['livereload']
      }
    },
    
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // custom task
  grunt.registerTask('happyPlan:configs_sample', "Create default config template files from .sample if it doesn't exist", function() {
    ['jekyll', 'compass'].forEach(function(element, index, array) {
      var configFile = grunt.template.process(happyPlan.src.configs[element]);
      if (!require('fs').existsSync(configFile)) {
        grunt.file.write(configFile, grunt.file.read(configFile + '.sample'));
        grunt.log.writeln(configFile.cyan + ' created.'.grey);
      }
    });
  });
  
  grunt.registerTask('happyPlan:config_bowerrc', "Create a .bowerrc file from the Happy-Plan configuration", function() {
    grunt.file.write('.bowerrc', JSON.stringify(grunt.config.get('happyPlan').bower.bowerrc, null, 4));
    grunt.log.writeln('.bowerrc'.cyan + ' created.'.grey);
  });
  
  // configs shouldn't be fired each build, because if we do so, compass just start with a fresh cache (no-cache = fews seconds...)
  // So, 'regarde' fire 'configs' :)
  grunt.registerTask('happyPlan:configs', ['assemble:compass', 'happyPlan:config_bowerrc']);

  // webfont:svgToFonts wrapper
  grunt.registerTask('happyPlan:svgToFonts', "Execute or skip 'webfont:svgToFonts' depending of the presence of SVG files in the '<%= happyPlan.src.assets.webfont %>' folder.", function() {
    if (grunt.file.expand(grunt.template.process('<%= happyPlan.src.assets.webfont %>/*.svg')).length) {
      grunt.log.writeln(grunt.template.process("SVG files in '<%= happyPlan.src.assets.webfont %>'. Executing 'webfont:svgToFonts'."));
      grunt.task.run('webfont:svgToFonts');
    }
    else {
      grunt.log.writeln(grunt.template.process("No SVG file in '<%= happyPlan.src.assets.webfont %>'. Skipping 'webfont:svgToFonts'.").yellow);
    }
  });

  grunt.registerTask('happyPlan:init', ['happyPlan:configs_sample', 'happyPlan:configs']);
  
  // jekyll
  grunt.registerTask('jekyll:config', ['assemble:jekyll']);
  grunt.registerTask('jekyll:copy',   ['copy:jekyllPages', 'copy:jekyllPosts', 'copy:jekyllPartials', 'copy:jekyllLayouts']);
  grunt.registerTask('jekyll:build',  ['clean:jekyll','jekyll:config', 'jekyll:copy', 'jekyll:compile']);
  grunt.registerTask('jekyll:dist',   ['jekyll:build', 'copy:jekyllBuildToDist']);
  
  // public commands
  grunt.registerTask('build',   ['clean:dist', 'happyPlan:init', 'jekyll:dist', 'copy:root', 'happyPlan:svgToFonts', 'copy:images', 'copy:static', 'copy:medias', 'concat:dist']);
  grunt.registerTask('dev',     ['jshint', 'build', 'compass:dev']);
  grunt.registerTask('dist',    ['jshint', 'build', 'compass:dist', 'uglify:dist', 'imagemin:dist', 'clean:build']);
  grunt.registerTask('default', ['dev', 'livereload-start', 'server', 'open:dev', 'regarde']);
  
  // server
  grunt.registerTask('server', 'connect:server');

  grunt.registerTask('test', ['dist', 'nodeunit']);
};
