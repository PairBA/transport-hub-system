module.exports = {
  // 选项...
  publicPath: '/hubmanager/',
  outputDir: 'hubmanager',

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('svg-inline-loader')
      .loader('svg-inline-loader')
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  assetsDir: 'static'
}
