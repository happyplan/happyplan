module.exports = function(grunt) {

  // imports
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('assemble');

  // set dev option to be true by default
    grunt.option('env', typeof grunt.option('env') !== 'undefined' ? grunt.option('env') : 'dev');
  
  // project configuration
  var pkg = grunt.file.readJSON('package.json'),
      happyPlan = grunt.file.readJSON('happy-plan.json');

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
          // require: happyPlan.compass.require.length>0 ? "require \"" + happyPlan.compass.require.join("\"\nrequire \"") + "\"" : "",
          // additional_import_paths: happyPlan.compass.additional_import_paths ? ("additional_import_paths = [" + (happyPlan.compass.additional_import_paths.length>0 ? ("\n    \"" + happyPlan.compass.additional_import_paths.join("\",\n    \"") + "\"\n]") : "]")) : '',
          
          ext: '.rb'
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
        src:            '<%= happyPlan.build.jekyll._ %>',
        dest:           '<%= happyPlan.build.jekyll.dest %>',
        baseurl:        '<%= happyPlan.baseUrl %>',
        pygments:       true
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
      dist: {
        files: {
          '<%= happyPlan.dist.assets.scripts %>/script.js': ['<%= happyPlan.src.assets.scripts %>/*.js']
        }
      }
    },

    // minify javascript
    uglify: {
      dist: {
        files: {
          '<%= happyPlan.dist.assets.scripts %>/script.js': ['<%= happyPlan.dist.assets.scripts %>/script.js']
        }
      }
    },

    /*
    Doesn't work
    webfont: {
      icons: {
        src: '<%= happyPlan.src.assets.fontcustom %>/*.svg',
        dest: '<%= happyPlan.dist.assets.fonts %>/icons',
        destCss: '<%= happyPlan.src.assets.styles %>',
        options: {
            styles: 'icon',
            stylesheet: 'scss',
            hashes: false
        }
      }
    },*/

    // some shell cmds
    shell: {
      svgToFonts: {
        command: './bin/fontcustom.sh',
        options: {
          stdout: true
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
        files: ['<%= happyPlan.src.configs._ %>/**/*'],
        tasks: ['happyPlan:configs']
      },
      html: {
          files: ['<%= happyPlan.src.path %>**/*.{html,md,txt,xml}'],
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
          files: ['<%= happyPlan.src.assets.static %>**/*.*', '!<%= happyPlan.src.assets.static %>**/_*/**'],
          tasks: ['copy:static']
      },
      images: {
          files: ['<%= happyPlan.src.assets.images %>/**/*.*'],
          tasks: ['copy:images']
      },
      icons: {
          files: ['<%= happyPlan.src.assets.fontcustom %>/icons/*.svg'],
          tasks: ['']
      },
      livereload: {
          files: ['<%= happyPlan.dist.path %>**/*.*'],
          tasks: ['livereload']
      }
    }
  });

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
  grunt.registerTask('happyPlan:configs', ['assemble:compass', 'assemble:jekyll', 'happyPlan:config_bowerrc']);

  // main commands
  grunt.registerTask('init', ['happyPlan:configs_sample', 'happyPlan:configs']);
  
  grunt.registerTask('build',   ['clean:dist', 'jekyll:dist', 'init', 'copy:root', 'shell:svgToFonts', 'copy:images', 'copy:static', 'copy:medias', 'concat:dist']);
  grunt.registerTask('dev',     ['jshint', 'build', 'compass:dev']);
  grunt.registerTask('dist',    ['jshint', 'build', 'compass:dist', 'uglify:dist', 'imagemin:dist', 'clean:build']);
  grunt.registerTask('default', ['dev', 'livereload-start', 'server', 'open:dev', 'regarde']);

  // jekyll
  grunt.registerTask('jekyll:dist',   ['jekyll:build', 'copy:jekyllBuildToDist']);
  grunt.registerTask('jekyll:build',  ['clean:jekyll','jekyll:copy', 'jekyll:compile']);
  grunt.registerTask('jekyll:copy',   ['copy:jekyllPages', 'copy:jekyllPosts', 'copy:jekyllPartials', 'copy:jekyllLayouts']);

  // server
  grunt.registerTask('server', 'connect:server');

  // waiting for https://github.com/gruntjs/grunt-contrib-imagemin/issues/11 to use just 'build' here
  grunt.registerTask('test', ['jshint', 'build', 'compass:dist', 'uglify:dist', 'copy:images']);
};
