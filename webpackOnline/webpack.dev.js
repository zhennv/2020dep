const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const commomConfig = require('./webpack.common.js');
const DIST_PATH = path.resolve(__dirname,'./dist');

const devConfig = {
    mode:'development',
    output:{
        path:DIST_PATH,
        filename:'[name].[hash:5].js',
        chunkFilename:'[vendors].[hash:5].js'
    },
    //插件
    plugins:[
        
    ],  
    //开发服务器
    devServer:{
        hot:true,
        // open:true,
        contentBase:DIST_PATH,
        host:"0.0.0.0",
        port:8080,
        // https:true,//接口是https
        noInfo:true,
        historyApiFallback:true,//404页面都连接到index.html,history模式时配置为true可以帮忙找到页面
        proxy:{
            "/api":"http://localhost:3000"
        },
        useLocalIp:true,
    }
}

module.exports = merge(commomConfig,devConfig)