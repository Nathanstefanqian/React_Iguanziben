const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    //访问端口已是api开头的请求都代理到8000
    createProxyMiddleware('/api/v1', {
      target: 'http://m.iguanziben.com',   //代理地址
      changeOrigin: true
    })
  )
  app.use(
    //访问端口已是api开头的请求都代理到8000
    createProxyMiddleware('/upfiles', {
      target: 'http://m.iguanziben.com',   //代理地址
      changeOrigin: true
    })
  )
}
