/* global process: true */

module.exports = function(config) {
    'use strict';
    
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: './',

        frameworks: ['jasmine', 'requirejs'],
        
        files: [
            'Spec/MainKarma.js', {
            pattern : 'Source/*.js',
            included : false
        }, {
            pattern : 'Spec/*Test.js',
            included: false
        }], 

        // list of files to exclude
        exclude: [
        ],

        reporters: ['spec'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: true,

        // Start these browsers, currently available:
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 20000,

        // Set to false to watch files for changes
        singleRun: false,

        plugins: ["karma-jasmine", "karma-requirejs", 
            "karma-spec-reporter", 'karma-phantomjs-launcher'],        
        
    });
};
