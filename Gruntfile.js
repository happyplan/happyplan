module.exports = function(grunt) {

    // Imports
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-livereload');

    // Project configuration.
    var happyPlan = grunt.file.readJSON('happy-plan.json');

    grunt.initConfig({

        happyPlan : happyPlan,

        clean: {
            build: {
                src: ['<%= happyPlan.build.path %>']
            }
        },

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
                src:            '<%= happyPlan.src.path %>',
                dest:           '<%= happyPlan.build.path %>',
                baseurl:        '<%= happyPlan.baseUrl %>',
                pygments:       true
            }
        },

        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= happyPlan.src.assets.fonts %>',
                        src: ['**'],
                        dest: '<%= happyPlan.build.assets.fonts %>/' }
                ]
            },
            // to avoid imagemin when dev
            fakeImagemin: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= happyPlan.src.assets.images %>/',
                        src: ['**'],
                        dest: '<%= happyPlan.build.assets.images %>/'
                    }
                ]
            },
            livereload: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= happyPlan.src.assets.scripts %>',
                        src: ['livereload.js'],
                        dest: '<%= happyPlan.build.assets.scripts %>/'
                    }
                ]
            }
        },

        concat: {
            build: {
                src: [
                    '<%= happyPlan.src.assets.scripts %>/script.js'
                ],
                dest: '<%= happyPlan.build.assets.scripts %>/script.js'
            }
        },

        webfont: {
            icons: {
                src: '<%= happyPlan.src.assets.fontcustom %>/icons/*.svg',
                dest: '<%= happyPlan.build.assets.fonts %>/icons',
                destCss: '<%= happyPlan.src.assets.styles %>',
                options: {
                    styles: 'icon',
                    stylesheet: 'scss',
                    hashes: false
                }
            }
        },

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
                        'http_imagespath = "' + happyPlan.baseUrl + happyPlan.build.assets.images.replace(happyPlan.build.path, '') + '"',
                        'http_javascriptspath = "' + happyPlan.baseUrl + happyPlan.build.assets.scripts.replace(happyPlan.build.path, '') + '"',
                        'http_fontspath = "' + happyPlan.baseUrl + happyPlan.build.assets.fonts.replace(happyPlan.build.path, '') + '"',
                    ].join("\n"),

                    outputStyle: 'expanded',
                    noLineComments: false,
                    debugInfo: true
                }
            },
            dist: {
                options: {
                    sassDir: '<%= happyPlan.src.assets.styles %>',
                    cssDir: '<%= happyPlan.build.assets.styles %>',
                    imagesDir: '<%= happyPlan.src.assets.images %>',
                    javascriptsDir: '<%= happyPlan.src.assets.scripts %>',
                    fontsDir: '<%= happyPlan.src.assets.fonts %>',

                    // here we give to compass build path (without build root)
                    raw: [
                        'httppath = "' + happyPlan.baseUrl + '"',
                        'http_imagespath = "' + happyPlan.baseUrl + happyPlan.build.assets.images.replace(happyPlan.build.path, '') + '"',
                        'http_javascriptspath = "' + happyPlan.baseUrl + happyPlan.build.assets.scripts.replace(happyPlan.build.path, '') + '"',
                        'http_fontspath = "' + happyPlan.baseUrl + happyPlan.build.assets.fonts.replace(happyPlan.build.path, '') + '"',
                    ].join("\n"),

                    outputStyle: 'compressed',
                    noLineComments: true,
                    force: true
                }
            }
        },

        uglify: {
            build: {
                files: {
                    '<%= happyPlan.build.assets.scripts %>/script.js': ['<%= happyPlan.build.assets.scripts %>/script.js']
                }
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: {
                    '<%= happyPlan.build.assets.images %>': '<%= happyPlan.src.assets.images %>/**/*',
                    '<%= happyPlan.build.medias %>': '<%= happyPlan.build.medias %>/**/*'
                }
            }
        },

        regarde: {
            html: {
                files: ['<%= happyPlan.src.path %>/**/*.html', '<%= happyPlan.src.path %>/**/*.md'],
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
            fonts: {
                files: ['<%= happyPlan.src.assets.fonts %>/**/*'],
                tasks: ['copy:fonts']
            },
            images: {
                files: ['<%= happyPlan.src.assets.images %>/**/*.scss'],
                tasks: ['copy:fakeImagemin']
            },
            icons: {
                files: ['<%= happyPlan.src.assets.fontcustom %>/icons/*.svg'],
                tasks: 'webfont:icons'
            },
            livereload: {
                files: ['<%= happyPlan.build.assets.path %>/**'],
                tasks: 'livereload'
            }
        }
    });

    grunt.registerTask('default', ['dev', 'livereload-start', 'regarde']);

    //grunt.registerTask('build', ['clean:build', 'jekyll:build', 'copy:fonts', 'concat:build', 'webfont:icons']);
    grunt.registerTask('build', ['clean:build', 'jekyll:build', 'copy:fonts', 'concat:build']);
    grunt.registerTask('dev', ['build', 'compass:dev', 'copy:fakeImagemin', 'copy:livereload']);
    grunt.registerTask('dist', ['build', 'compass:dist', 'uglify:build', 'imagemin:dist']);

    grunt.registerTask('server', 'jekyll:server');
};
