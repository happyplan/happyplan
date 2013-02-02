module.exports = function(grunt) {

    // Imports
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Project configuration.
    grunt.initConfig({

        clean: {
            build: {
                src: ['build']
            }
        },

        jekyll: {
            server : {
                src:            'src',
                dest:           'build',
                server:         true,
                server_port:    8000,
                auto:           false,
                baseurl:        ''
            },
            build: {
                src:            'src',
                dest:           'build',
                baseurl:        '',
                pygments:       true
            }
        },

        copy: {
            assets: {
                files: [
                    { src: ['src/_assets/fonts'], dest: 'build/assets/fonts' }
                ]
            },
            dev: {
                files: [
                    // to avoid imagemin when dev
                    { src: ['src/_assets/img'], dest: 'build/assets/img' }
                ]
            }
        },

        concat: {
            build: {
                src: [
                    'src/_js/app.js'
                ],
                dest: 'build/js/app.js'
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'src/_assets/styles',
                    cssDir: 'build/assets/css',
                    outputStyle: 'expanded',
                    noLineComments: false,
                    debugInfo: true,
                    relativeAssets: true
                }
            },
            dist: {
                options: {
                    sassDir: 'src/_assets/_styles',
                    cssDir: 'build/assets/css',
                    outputStyle: 'compressed',
                    noLineComments: true,
                    force: true,
                    relativeAssets: true
                }
            }
        },

        uglify: {
            build: {
                'build/js/app.js': ['build/js/app.js']
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: {
                    'build/assets/img': 'src/_assets/img/*',
                    'build/uploads': 'build/uploads/*'
                }
            }
        },

        shell: {
            fontcustom: {
                command: 'bin/fontcustom.sh',
                stdout: true
            },
            newpost: {
                command: 'bin/newpost.sh',
                stdout: true
            },
            publish: {
                command: 'bin/publish.sh',
                stdout: true
            }
        },

        watch: {
            global: {
                files: ['src/**/*'],
                tasks: ['dev']
            }
        }
    });

    grunt.registerTask('default', 'watch');

    grunt.registerTask('build', ['clean:build', 'jekyll:build', 'copy:assets', 'concat:build', 'shell:fontcustom']);
    grunt.registerTask('dist', ['build', 'compass:dist', 'uglify:build', 'imagemin:dist']);
    grunt.registerTask('dev', ['build', 'compass:dev', 'copy:dev']);

    grunt.registerTask('server', 'jekyll:server');
};
