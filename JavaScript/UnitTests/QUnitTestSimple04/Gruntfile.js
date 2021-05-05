module.exports = function(grunt) {
    'use strict';

    var zipFile = 'QUnitTestSimple04.zip';

    grunt.initConfig({
        zipFile: zipFile,

        jshint: {
            files: ['*.js'],

            options: {
                ignores: [
                    'coverage/**',
                    '**/node_modules/**',
                    'jquery-1.9.1.js',
                    'qunit-1.13.0.css',
                    'qunit-1.13.0.js'
                ],
                reporter: 'checkstyle',
                reporterOutput: 'result.xml',
                strict: true,
                newcap: false,
                globals: {
                    describe: true,
                    afterEach: true,
                    beforeEach: true,
                    inject: true,
                    it: true,
                    jasmine: true,
                    expect: true,
                    angular: true,
                    module: true,
                    Crafty: true
                }
            }
        },

        clean: {
            work: {
                src: [
                    "**/node_modules/**",
                ]
            },

            zip: {
                src: []
            }
        },

        compress: {
            unitTestSimple: {
                options: {
                    archive: '<%= zipFile %>',
                    mode: 'zip'
                },
                files: [{
                    src: './*.html'
                }, {
                    src: './*.js*'
                }, {
                    src: './*.css'
                }, {
                    src: '*/*.json'
                }, {
                    src: './README.md'
                }]
            }
        },

        copy: {
            main: {
                src: '<%= zipFile %>',
                dest: process.env.HOMEPATH + '/Aptana Rubles/ElfRuble/templates/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('dist', ['clean:zip', 'compress:unitTestSimple', 'copy:main']);
};
