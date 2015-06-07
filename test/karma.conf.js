'use strict';

module.exports = function(karma) {
	karma.set({

		// Base path that will be used to resolve all patterns (eg. files, exclude).
		basePath: '../',

		// Frameworks to use.
		frameworks: [ 'jasmine' ],

		// List of files/patterns to load in the browser.
		files: [
			{ pattern: 'test/specs/*.js', served: true, included: true, watched: true }
		],

		// List of files to exclude.
		exclude: [],

		// Test results reporter to use. Possible values: 'dots', 'progress'.
		reporters: [ 'dots' ],

		// Preprocess matching files before serving them to the browser.
		preprocessors: {
			'test/specs/*.js': [ 'webpack' ]
		},

		// Start this browsers
		browsers: [ 'Chrome' ],

		/**
		 * Level of logging. Possible values:
		 * config.LOG_DISABLE
		 * config.LOG_ERROR
		 * config.LOG_WARN
		 * config.LOG_INFO
		 * config.LOG_DEBUG
		 */
		logLevel: karma.LOG_DISABLE,

		// Enable / disable colors in the output (reporters and logs).
		colors: true,

		// Web server port.
		port: 9876,

		webpack: {
			module: {
				loaders: [
					{ 
						exclude: /node_modules/,
						test: /\.js$/,
						loader: 'babel-loader'
					}
				]
			}
		},

		// Prevent webpack from logging stuff to the console.
		webpackServer: {
			noInfo: true
		},

		/**
		 * Continuous Integration mode.
		 * If true, Karma captures browsers, runs the tests and exits.
		 */
		singleRun: true,

		// Enable/disable watching file and executing tests whenever any file changes.
		autoWatch: false,

		plugins: [
			'karma-jasmine',
			'karma-webpack',
			'karma-chrome-launcher'
		]
	});
};