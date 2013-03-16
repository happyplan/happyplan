module.exports = function(grunt) {

  // Imports
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-webfont');

  // Project configuration.
  var happyPlan = grunt.file.readJSON('happy-plan.json');

  grunt.initConfig({

    happyPlan: happyPlan,

    jshint: happyPlan.grunt.jshint,

    // Remove folders and files
    clean: {
      build: {
        src: ['<%= happyPlan.build.path %>']
      },
      jekyll: {
        src: ['<%= happyPlan.build.path %>/jekyll']
      }
    },

    // Static file generator
    jekyll: {
      server : {
        src:            '<%= happyPlan.src.path %>',
        dest:           '<%= happyPlan.build.path %>',
        server:         true,
        server_port:    8000,
        auto:           false,
        baseurl:        '<%= happyPlan.baseUrl %>'
      },
      build: {
        src:            'build/jekyll/',
        dest:           'build/',
        baseurl:        '<%= happyPlan.baseUrl %>',
        pygments:       true
      }
    },

    // Copy folders and files
    copy: {
      jekyllPages: {
        files: [
          {
            expand: true,
            cwd: 'src/pages/',
            src: ['**'],
            dest: 'build/jekyll/'
          }
        ]
      },
      jekyllPosts: {
        files: [
          {
              expand: true,
              cwd: 'src/posts/',
              src: ['**'],
              dest: 'build/jekyll/_posts/'
          }
        ]
      },
      jekyllLayouts: {
        files: [
          {
            expand: true,
            cwd: 'src/layouts/',
            src: ['**'],
            dest: 'build/jekyll/_layouts/'
          }
        ]
      },
      jekyllPartials: {
        files: [
          {
            expand: true,
            cwd: 'src/partials/',
            src: ['**'],
            dest: 'build/jekyll/_includes/'
          }
        ]
      },
      jekyllConfig: {
        files: [
          {
            src: 'src/config/config.yml',
            dest: 'build/jekyll/_config.yml'
          }
        ]
      },
      static: {
        files: [
          {
            expand: true,
            cwd: '<%= happyPlan.src.assets.static %>',
            src: ['**'],
            dest: '<%= happyPlan.build.assets.static %>/'
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: '<%= happyPlan.src.assets.images %>/',
            src: ['**'],
            dest: '<%= happyPlan.build.assets.images %>/'
          }
        ]
      }
    },

    // Concat scripts
    concat: {
      build: {
        files: {
          '<%= happyPlan.build.assets.scripts %>/script.js': ['<%= happyPlan.src.assets.scripts %>/*.js']
        }
      }
    },

    // Minify javascript
    uglify: {
      build: {
        files: {
          '<%= happyPlan.build.assets.scripts %>/script.js': ['<%= happyPlan.build.assets.scripts %>/script.js']
        }
      }
    },

    webfont: {
      icons: {
        src: '<%= happyPlan.src.assets.fontcustom %>/*.svg',
        dest: '<%= happyPlan.build.assets.fonts %>/icons',
        destCss: '<%= happyPlan.src.assets.styles %>',
        options: {
            styles: 'icon',
            stylesheet: 'scss',
            hashes: false
        }
      }
    },

    // Some shell cmds
    shell: {
      fontcustom: {
        command: './bin/fontcustom.sh',
        options: {
          stdout: true
        }
      }
    },

    // Time to have some styles!
    compass: {
      dev: {
        options: {
          sassDir: '<%= happyPlan.src.assets.styles %>',
          cssDir: '<%= happyPlan.build.assets.styles %>',
          imagesDir: '<%= happyPlan.src.assets.images %>',
          javascriptsDir: '<%= happyPlan.src.assets.scripts %>',
          fontsDir: '<%= happyPlan.src.assets.fonts %>',

          // here we give to compass build path (without build root)
          raw: [
              'httppath = "' + happyPlan.baseUrl + '"',
              'http_images_path = "' + happyPlan.baseUrl + happyPlan.build.assets.images.replace(happyPlan.build.path, '') + '"',
              'http_javascripts_path = "' + happyPlan.baseUrl + happyPlan.build.assets.scripts.replace(happyPlan.build.path, '') + '"',
              'http_fonts_path = "' + happyPlan.baseUrl + happyPlan.build.assets.static.replace(happyPlan.build.path, '') + '/fonts"'
          ].join("\n"),

          outputStyle: 'expanded',
          noLineComments: false,
          debugInfo: true
        }
      },
      build: {
        options: {
          sassDir: '<%= happyPlan.src.assets.styles %>',
          cssDir: '<%= happyPlan.build.assets.styles %>',
          imagesDir: '<%= happyPlan.src.assets.images %>',
          javascriptsDir: '<%= happyPlan.src.assets.scripts %>',
          fontsDir: '<%= happyPlan.src.assets.fonts %>',

          // here we give to compass build path (without build root)
          raw: [
              'httppath = "' + happyPlan.baseUrl + '"',
              'http_images_path = "' + happyPlan.baseUrl + happyPlan.build.assets.images.replace(happyPlan.build.path, '') + '"',
              'http_javascripts_path = "' + happyPlan.baseUrl + happyPlan.build.assets.scripts.replace(happyPlan.build.path, '') + '"',
              'http_fonts_path = "' + happyPlan.baseUrl + happyPlan.build.assets.static.replace(happyPlan.build.path, '') + '/fonts"'
          ].join("\n"),

          outputStyle: 'compressed',
          noLineComments: true,
          force: true
        }
      }
    },

    // Optimise images
    imagemin: {
      build: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: "<%= happyPlan.build.assets.images %>",
            src: ["**/*"],
            dest: "<%= happyPlan.build.assets.images %>"
          },
          {
            expand: true,
            cwd: "<%= happyPlan.build.medias %>",
            src: ["**/*"],
            dest: "<%= happyPlan.build.medias %>"
          }
        ]
      }
    },

    regarde: {
      jshint: {
          files: [
              '**/*.js',
              '**/*.json'
          ],
          tasks: ['jshint']
      },
      html: {
          files: ['<%= happyPlan.src.path %>/**/*.{html,md,txt}'],
          tasks: ['dev']
      },
      js: {
          files: ['<%= happyPlan.src.assets.scripts %>/**/*'],
          tasks: ['concat:build']
      },
      scss: {
          files: ['<%= happyPlan.src.assets.styles %>/**/*'],
          tasks: ['compass:dev']
      },
      static: {
          files: ['<%= happyPlan.src.assets.static %>/**/*'],
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
          files: ['<%= happyPlan.build.assets.path %>/**'],
          tasks: ['livereload']
      }
    }
  });

  grunt.registerTask('default', ['dev', 'livereload-start', 'regarde']);
  grunt.registerTask('build', ['clean:build', 'jekyll:copy', 'jekyll:build', 'clean:jekyll', 'copy:images', 'copy:static', 'concat:build']);
  grunt.registerTask('dev', ['jshint', 'build', 'compass:dev']);
  grunt.registerTask('dist', ['jshint', 'build', 'compass:build', 'uglify:build', 'imagemin:build']);

  grunt.registerTask('jekyll:copy', ['copy:jekyllPages', 'copy:jekyllPosts', 'copy:jekyllPartials', 'copy:jekyllConfig', 'copy:jekyllLayouts']);

  grunt.registerTask('server', 'jekyll:server');

  // waiting for https://github.com/gruntjs/grunt-contrib-imagemin/issues/11 to use just 'build' here
  grunt.registerTask('test', ['jshint', 'build', 'compass:build', 'uglify:build', 'copy:fakeImagemin']);
};