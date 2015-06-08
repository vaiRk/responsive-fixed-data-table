// LIBRARIES
// - - - - - - - - - - - - - - -
var gulp           = require('gulp'),
	rimraf         = require('rimraf'),
	runSequence    = require('run-sequence'),
	source         = require('vinyl-source-stream'),
	buffer         = require('vinyl-buffer'),
	browserify     = require('browserify'),
	reactify       = require('reactify'),
	modRewrite     = require('connect-modrewrite'),
	connect        = require('gulp-connect');

// FILE PATHS
// - - - - - - - - - - - - - - -
var paths = {
	mainHtml:   './src/index.html',
	mainJs:     './src/responsive-table-example.js',
	fixedDataTableCss: './node_modules/fixed-data-table/dist/fixed-data-table.min.css'
};

var buildPaths = {
	main:       './build',
	js:         './build/assets/js/',
	css: 		'./build/assets/css/'
};

// BUNDLER
// - - - - - - - - - - - - - - -
var bundler = browserify({
	entries: [paths.mainJs], // Only need initial file, browserify finds the deps
	transform: [
		reactify // We want to convert JSX to normal javascript
	],
	debug: true, // Gives us sourcemapping
	cache: {},
	packageCache: {},
	fullPaths: true
});

// TASKS
// - - - - - - - - - - - - - - -
// Cleans the build directory.
gulp.task('clean', function(cb) {
	rimraf(buildPaths.main, cb);
});

// Bundle files and minify for prod.
gulp.task('bundle', function() {
	return bundler
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(gulp.dest(buildPaths.js));
});

// Copies html file
gulp.task('copy-html-css', function() {
	gulp.src(paths.mainHtml)
		.pipe(gulp.dest(buildPaths.main));
	return 	gulp.src(paths.fixedDataTableCss)
		.pipe(gulp.dest(buildPaths.css));
});

// Starts a test server at http://localhost:8080
gulp.task('server:start', function() {
	return connect.server({
		root: './build',
		middleware: function() {
			return [
				modRewrite(['^[^\\.]*$ /index.html [L]'])
			];
		}
	});
});

// Builds the app prod ready.
gulp.task('build', function() {
	runSequence('clean', ['bundle'], 'copy-html-css', function() {
		console.log('Successfully built.');
	});
});

// Default task: builds your app and starts a server.
gulp.task('default', function() {
	runSequence('build', 'server:start');
});