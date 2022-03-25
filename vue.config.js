module.exports = {
    devServer:{
        proxy:{ //配置跨域
            '/api':{
                target:'http://139.196.235.231:8080',
                pathRewrite:{
                    '^/api':''   //请求的时候使用这个api就可以
                }
            }
        }
    }
}