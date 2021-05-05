module.exports = function(grunt) {
    'use strict';

    var zipFile = 'JasmineSpyOn.zip';

    grunt.initConfig({
        zipFile: zipFile,
        jshint: {
            files: ['**/*.js'],

            options: {
                ignores: ['**/jquery*.js',
                    '**/jasmine*.js',
                    'Library/*.js',
                    '**/angular.js',
                    '**/angular-mocks.js',
                    '**/coverage/**',
                    '**/node_modules/**'
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
                src: ["**/node_modules/**"]
            },

            zip: {
                src: [zipFile]
            }
        },

        compress: {
            angularKarma: {
                options: {
                    archive: '<%= zipFile %>',
                    mode: 'zip'
                },
                files: [{
                    src: './*.html'
                }, {
                    src: './*.js*'
                }, {
                    src: './Assets/**'
                }, {
                    src: './Library/**'
                }, {
                    src: './Source/**'
                }, {
                    src: './Style/**'
                }, {
                    src: './Test/**'
                }, {
                    src: './LICENSE'
                }, {
                    src: './README.md'
                }]
            }
        },

        copy: {
            main: {
                src: '<%= zipFile %>',
                dest: process.env.HOMEPATH + '/Aptana Rubles/ElfRuble/templates/'
            },
            deploy: {
                src: ['index.html', 'Source/*.js', 'Styles/*.css', 'Library/jquery*.js', 'BackEndData.json', 'Sources.html'],
                dest: 'Deploy/',
            }
        },

        strip_code: {
            options: {
                start_comment: "grunt-can-remove-test-code",
                end_comment: "end-grunt-can-remove-test-code",
            },
            your_target: {
                // a list of files you want to strip code from
                src: "Deploy/Source/LoadJson.js"
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-strip-code');

    grunt.registerTask("deploy", ["jshint", "copy:deploy", "strip_code"]);

    grunt.registerTask('dist', ['clean:zip', 'compress:angularKarma', 'copy:main']);
};
