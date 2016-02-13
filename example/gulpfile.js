// LIBRARIES
// - - - - - - - - - - - - - - -
var gulp           = require('gulp'),
	rimraf         = require('rimraf'),
	runSequence    = require('run-sequence'),
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

// TASKS
// - - - - - - - - - - - - - - -
// Cleans the build directory.
gulp.task('clean', function(cb) {
	rimraf(buildPaths.main, cb);
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
		port: 8000,
		middleware: function() {
			return [
				modRewrite(['^[^\\.]*$ /index.html [L]'])
			];
		}
	});
});

// Builds the app prod ready.
gulp.task('build', function() {
	runSequence('clean', 'copy-html-css', function() {
		console.log('Successfully built.');
	});
});

// Default task: builds your app and starts a server.
gulp.task('default', function() {
	runSequence('build', 'server:start');
});