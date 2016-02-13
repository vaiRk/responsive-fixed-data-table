'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: __dirname,
	entry: path.resolve(__dirname, 'src', 'responsive-table-example.js'),
	output: {
		path: path.resolve(__dirname, 'build', 'assets', 'js'),
		sourceMapFileName: '[file].map',
		filename: 'bundle.js',
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		preLoaders: [
			{ test: /\.js$/, include: /responsive-fixed-data-table/, loader: 'source-map' }
		],
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' }
		]
	}
}