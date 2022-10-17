const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/v1',                              //访问端口已是api开头的请求都代理到8000
    createProxyMiddleware({
      target: 'http://m.iguanziben.com',   //代理地址
      changeOrigin: true,
    })
  ),
    app.use(
      '/upfiles',                              //访问端口已是api开头的请求都代理到8000
      createProxyMiddleware({
        target: 'http://m.iguanziben.com',   //代理地址
        changeOrigin: true,
      })
    )
}
