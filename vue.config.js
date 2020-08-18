module.exports = {
    // publicPath: './',
    // assetsDir: 'static',
    // productionSourceMap: false,
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        // proxy: {  //配置跨域
        //     '/examples': {
        //         target: 'https://echarts-www.cdn.bcebos.com',  //这里是后台的地址
        //         ws: true,
        //         changOrigin: true,  //允许跨域
        //         pathRewrite: {
        //             '^/examples': '/examples'  //请求的时候使用这个examples就可以
        //         }
        //     }
        // }

        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '/'
                }
              }
        }
    },
};
