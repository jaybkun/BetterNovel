module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    angular: true
                }
            },
            server: ['app.js', 'bin/www', 'routes/**/*.js', 'db/**/*.js'],
            client: ['public/js/**/*.js', 'public/views/**/*.js'],
            test: ['test/**/*.js'],
            gruntfile: ['Gruntfile.js'],
            all: ['**/*.js', '!node_modules/**', '!public/bower_components/**']
        },
        watch: {
            server: {
                files: ['<%= jshint.server %>'],
                tasks: ['jshint:server']
            },
            client: {
                files: ['<%= jshint.client %>'],
                tasks: ['jshint:client', 'includeSource']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:gruntfile']
            },
            tests: {
                files: ['<%= jshint.test %>'],
                tasks: ['jshint:test']
            },
            index: {
                files: ['public/index.tmpl.html'],
                tasks: ['includeSource']
            }

        },
        includeSource: {
            options: {
                basePath: 'public',
                templates: {
                    html: {
                        js: '<script src="{filePath}" type="text/javascript"></script>'
                    }
                }
            },
            dist: {
                files: {
                    'public/index.html': ['<%= watch.index.files %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-include-source');

    grunt.registerTask('default', ['includeSource']);
};