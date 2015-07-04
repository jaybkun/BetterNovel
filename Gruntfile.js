module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            server: ['app.js', 'bin/www', 'routes/**/*.js', 'models/**/*.js', 'db/**/*.js'],
            client: ['public/js/**/*.js'],
            test: ['test/**/*.js'],
            gruntfile: ['Gruntfile.js']
        },
        watch: {
            options: {
                atBegin: true
            },
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
                tasks: ['jshint']
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
                    },
                    jade: {
                        js: 'script(src="{filePath}", type="text/javascript")'
                    }
                }
            },
            dist: {
                files: {
                    'public/index.html': 'templates/index.tmpl.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-include-source');

    grunt.registerTask('default', ['jshint', 'includeSource']);
};