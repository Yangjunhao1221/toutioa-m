const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '127.0.0.1',
    port: 4040,
    open: true,//浏览器自动打开
  },
  lintOnSave: false//关闭eslint代码检测工具
})
