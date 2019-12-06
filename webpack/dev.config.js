const merge = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig,{
	mode: 'development',
	entry: {
	},
	output: {
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
                    configFile: 'webpack/tsconfig/dev.json'
                },
			},
			{
				test: /\.(glsl|vs|fs)$/,
				loader: 'shader-loader',
				options: {
					glsl: {	
						chunkPath: "examples/glsl-chunks"
					}
				}
			}
		]
	}
});	