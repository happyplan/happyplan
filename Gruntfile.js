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

  // project configuration
  var happyPlan = grunt.file.readJSON('happy-plan.json');

  // grujnt configuration
  grunt.initConfig({

    happyPlan: happyPlan,

    jshint: happyPlan.grunt.jshint,

    // open in browser
    open : {
      dev : {
        path: 'http://127.0.0.1:8080/'
      }
    },

    // server
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'dist'
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
        src: ['build/']
      },
      jekyll: {
        src: ['build/.jekyll', 'build/jekyll']
      }
    },

    // static file generator
    jekyll: {
      compile: {
        src:            'build/.jekyll/',
        dest:           'build/jekyll/',
        baseurl:        '<%= happyPlan.baseUrl %>',
        pygments:       true
      }
    },

    // Copy folders and files
    copy: {
      cssAsScss: {
        files: [
          {
            expand: true,
            cwd: 'src/assets/_components',
            src: ['**/*.css'],
            dest: 'src/assets/_components',
            filter: 'isFile',
            ext:    ".scss"
          }
        ]
      },
      jekyllBuildToDist: {
        files: [
          {
            expand: true,
            cwd: 'build/jekyll/',
            src: ['**'],
            dest: 'dist/'
          }
        ]
      },
      jekyllPages: {
        files: [
          {
            expand: true,
            cwd: 'src/_pages/',
            src: ['**'],
            dest: 'build/.jekyll/'
          }
        ]
      },
      jekyllPosts: {
        files: [
          {
              expand: true,
              cwd: 'src/_posts/',
              src: ['**', '!_*'],
              dest: 'build/.jekyll/_posts/'
          }
        ]
      },
      jekyllLayouts: {
        files: [
          {
            expand: true,
            cwd: 'src/_layouts/',
            src: ['**'],
            dest: 'build/.jekyll/_layouts/'
          }
        ]
      },
      jekyllPartials: {
        files: [
          {
            expand: true,
            cwd: 'src/_partials/',
            src: ['**'],
            dest: 'build/.jekyll/_includes/'
          }
        ]
      },
      jekyllConfig: {
        files: [
          {
            src: 'src/_config/config.yml',
            dest: 'build/.jekyll/_config.yml'
          }
        ]
      },
      static: {
        files: [
          {
            expand: true,
            cwd: '<%= happyPlan.src.assets.static %>',
            src: ['**/*', '!**/_*/**'],
            dest: '<%= happyPlan.dist.assets.static %>/'
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: '<%= happyPlan.src.assets.images %>/',
            src: ['**'],
            dest: '<%= happyPlan.dist.assets.images %>/'
          }
        ]
      },
      medias: {
        files: [
          {
            expand: true,
            cwd: '<%= happyPlan.src.medias %>/',
            src: ['**'],
            dest: '<%= happyPlan.dist.medias %>/'
          }
        ]
      },
      root: {
        files: [
          {
            expand: true,
            cwd: '<%= happyPlan.src.path %>',
            src: ['**/*','!**/_*/**'],
            dest: '<%= happyPlan.dist.root %>/'
          }
        ]
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
          sassDir: '<%= happyPlan.src.assets.styles %>',
          cssDir: '<%= happyPlan.dist.assets.styles %>',
          imagesDir: '<%= happyPlan.src.assets.images %>',
          javascriptsDir: '<%= happyPlan.src.assets.scripts %>',
          fontsDir: '<%= happyPlan.src.assets.fonts %>',

          // here we give to compass dist path (without dist root)
          raw: [
              'httppath = "' + happyPlan.baseUrl + '"',
              'http_images_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.images.replace(happyPlan.dist.path, '') + '"',
              'http_javascripts_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.scripts.replace(happyPlan.dist.path, '') + '"',
              'http_fonts_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.static.replace(happyPlan.dist.path, '') + '/fonts"'
          ].join("\n"),

          outputStyle: 'expanded',
          noLineComments: false,
          debugInfo: true
        }
      },
      dist: {
        options: {
          sassDir: '<%= happyPlan.src.assets.styles %>',
          cssDir: '<%= happyPlan.dist.assets.styles %>',
          imagesDir: '<%= happyPlan.src.assets.images %>',
          javascriptsDir: '<%= happyPlan.src.assets.scripts %>',
          fontsDir: '<%= happyPlan.src.assets.fonts %>',

          // here we give to compass dist path (without dist root)
          raw: [
              'httppath = "' + happyPlan.baseUrl + '"',
              'http_images_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.images.replace(happyPlan.dist.path, '') + '"',
              'http_javascripts_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.scripts.replace(happyPlan.dist.path, '') + '"',
              'http_fonts_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.static.replace(happyPlan.dist.path, '') + '/fonts"'
          ].join("\n"),

          outputStyle: 'compressed',
          noLineComments: true,
          force: true
        }
      }
    },

    // optimise images
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
      html: {
          files: ['<%= happyPlan.src.path %>/**/*.{html,md,txt,xml}'],
          tasks: ['jekyll:dist']
      },
      js: {
          files: ['<%= happyPlan.src.assets.scripts %>/**/*'],
          tasks: ['concat:dist']
      },
      scss: {
          files: ['<%= happyPlan.src.assets.styles %>/**/*'],
          tasks: ['compass:dev']
      },
      static: {
          files: ['<%= happyPlan.src.assets.static %>/**/*', '!<%= happyPlan.src.assets.static %>/**/_*/**'],
          tasks: ['copy:static']
      },
      images: {
          files: ['<%= happyPlan.src.assets.images %>/**/*'],
          tasks: ['copy:images']
      },
      icons: {
          files: ['<%= happyPlan.src.assets.fontcustom %>/icons/*.svg'],
          tasks: ['']
      },
      livereload: {
          files: ['<%= happyPlan.dist.path %>/**/*.*'],
          tasks: ['livereload']
      }
    }
  });

  // main commands
  grunt.registerTask('default', ['dev', 'livereload-start', 'server', 'open:dev', 'regarde']);
  grunt.registerTask('dist',    ['jshint', 'build', 'compass:dist', 'uglify:dist', 'imagemin:dist', 'clean:build']);
  grunt.registerTask('dev',     ['jshint', 'build', 'compass:dev']);
  grunt.registerTask('build',   ['clean:dist', 'jekyll:dist', 'copy:root', 'shell:svgToFonts', 'copy:images', 'copy:static', 'copy:medias', 'concat:dist']);

  // jekyll
  grunt.registerTask('jekyll:dist',   ['jekyll:build', 'copy:jekyllBuildToDist']);
  grunt.registerTask('jekyll:build',  ['clean:jekyll','jekyll:copy', 'jekyll:compile']);
  grunt.registerTask('jekyll:copy',   ['copy:jekyllPages', 'copy:jekyllPosts', 'copy:jekyllPartials', 'copy:jekyllConfig', 'copy:jekyllLayouts']);

  // server
  grunt.registerTask('server', 'connect:server');

  // waiting for https://github.com/gruntjs/grunt-contrib-imagemin/issues/11 to use just 'build' here
  grunt.registerTask('test', ['jshint', 'build', 'compass:dist', 'uglify:dist', 'copy:images']);
};