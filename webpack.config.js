'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: __dirname,
	entry: path.resolve(__dirname, 'src', 'responsive-fixed-data-table.js'),
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'responsive-fixed-data-table.js',
		sourceMapFileName: '[file].map',
		library: 'ResponsiveFixedDataTable',
		libraryTarget: 'umd'
	},
	devtool: 'source-map',
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
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
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
	]
}