module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.runtime.esm.js'
			}
		},
		output: {
			filename: "js/[name].js",
		},
		optimization: {
			splitChunks: false
		},
	},
	chainWebpack: config => {
		enableShadowCss(config);

		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule
			.oneOf('inline')
			.resourceQuery(/inline/)
			.use('vue-svg-loader')
			.loader('vue-svg-loader')
			.end()
			.end()
			.oneOf('external')
			.use('file-loader')
			.loader('file-loader')
			.options({
				name: 'assets/[name].[hash:8].[ext]'
			})
	},
	css: {
		extract: false,
	},
};


function enableShadowCss(config) {
	const configs = [
		config.module.rule('vue').use('vue-loader'),
		config.module.rule('css').oneOf('vue-modules').use('vue-style-loader'),
		config.module.rule('css').oneOf('vue').use('vue-style-loader'),
		config.module.rule('css').oneOf('normal-modules').use('vue-style-loader'),
		config.module.rule('css').oneOf('normal').use('vue-style-loader'),
		config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader'),
		config.module.rule('scss').oneOf('vue').use('vue-style-loader'),
		config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader'),
		config.module.rule('scss').oneOf('normal').use('vue-style-loader'),
	];

	configs.forEach(c => c.tap(options => {
		options.shadowMode = true;
		return options;
	}));
}
