'use strict';

var webpack = require('webpack');
var path = require('path');

var minify = process.env.NODE_ENV === 'production';
var plugins = [
	new webpack.optimize.OccurenceOrderPlugin()
];

if (minify) {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			compress: {
				warnings: false,
				screw_ie8: true,
				dead_code: true,
				drop_debugger: true,
				drop_console: true
			}
		})
	);
}

module.exports = {
	context: __dirname,
	entry: path.resolve(__dirname, 'src', 'responsive-fixed-data-table.js'),
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'responsive-fixed-data-table' + (minify ? '.min.js' : '.js'),
		library: 'ResponsiveFixedDataTable',
		libraryTarget: 'umd'
	},
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom'
		},
		'fixed-data-table': {
			root: 'FixedDataTable',
			commonjs2: 'fixed-data-table',
			commonjs: 'fixed-data-table',
			amd: 'fixed-data-table'
		}
	},
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' }
		]
	},
	plugins: plugins
}