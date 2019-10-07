module.exports = {
	resolve: {
		modules: ['node_modules'],
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
                    configFile: 'webpack/tsconfig/dev.json'
                }
			}
		]
	}
};