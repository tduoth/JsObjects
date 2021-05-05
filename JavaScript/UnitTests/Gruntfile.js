module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            files: ['**/*.js'],

            options: {
                ignores: ['*/angular-mocks.js',
                    '*/ui-bootstrap-tpls-*.js',
                    '*/knockout-*.js',
                    '*/Ractive.js',
                    '*/**/angular.js',
                    '**/coverage/**',
                    '**/node_modules/**',
                    '**/handlebars.js',
                    '**/jquery*.js',
                    '**/cordova*.js',
                    '*/**/qunit*.js',
                    '**/jasmine.js',
                    '**/jasmine-html.js',
                    '**/boot.js',
                    '**/console.js',
                    '**/jasmine-jquery.js',
                    '**/json2.js'
                ],
                reporter: 'checkstyle',
                reporterOutput: 'result.xml',
                strict: true,
            }
        },

        clean: {
            yourTarget: {
                src: ["**/node_modules/**", '*/barFooGoo/**']
            }
        },

        jsbeautifier: {
            files: ["**/*.js", '!**/node_modules/**',
                '!**/coverage/**',
                '!**/jquery*.js'
            ],
            options: {
                js: {
                    jslintHappy: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('pretty', ['jsbeautifier']);
};
