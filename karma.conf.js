// Karma configuration
// Generated on Sat Jun 20 2015 11:42:43 GMT-0300 (E. South America Standard Time)
require('babel-register');

var webpackConfig = require('./webpack/webpack.config.test.js');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.watch = true;

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'es6-shim',
      'mocha',
      'chai',
      'sinon'
    ],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill-find/find-polyfill.js',
      'test/index.js'
    ],
    
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/',
      instrumenters: { isparta : require('isparta') },
      instrumenter: {
        'test/index.js': 'isparta'
      }
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap', 'coverage']
    },

    webpack: webpackConfig,

    // this is so that the tests will stop printing information about the files being packed
    webpackMiddleware: {
      noInfo: true
    },
    
    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
