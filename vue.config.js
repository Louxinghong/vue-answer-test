const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 打包路径
  publicPath: './',
  // 输出目录
  outputDir: 'dist',
  lintOnSave: true,
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  // alias 配置
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .end()
  }
}
