var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var DIST_PATH = path.resolve(__dirname,'./dist');
var htmlWebpackPlugins = require("html-webpack-plugin");

var SRC_PATH = path.resolve(__dirname,'./src');
var newEntries = {};
var files = glob.sync(SRC_PATH+'/*.js');
files.forEach(function(file,index){
    var substr = file.match(/src\/(\S*)\.js/)[1];
    newEntries[substr] = file;
})
var CUR_PATH = path.resolve(__dirname,'./');
var htmlFiles = glob.sync(CUR_PATH+'/*.html');
var newHtmlWebpackPlugins = [];
htmlFiles.forEach(function(file,index){
    var substr = file.match(/\S*\/(\S*\.html)/)[1];
    newHtmlWebpackPlugins.push(new htmlWebpackPlugins({
        filename:path.resolve(DIST_PATH,substr),
        title:'树鱼充值平台',
        template:path.resolve(__dirname,substr),
        inject:true,
        hash:true,
        favicon:path.resolve(__dirname,'./fav.ico')
    }));
})

module.exports = {
    // entry:path.resolve(__dirname,'./src/index.js'),
    entry:newEntries,
    optimization:{
        splitChunks: {
            chunks: 'async',
        },
        runtimeChunk:{
            name:'mainfest'
        }
    },
    // entry:{//打包成多个文件
    //     index:'./src/index.js',
    //     main:'./src/main.js'
    // },
    // entry:['./src/index.js','./src/main.js'],//打包成一个文件
    // output:{
    //     path:DIST_PATH,
    //     filename:'[name].[chunkhash:5].js'
    // },
    //模块解析
    module:{
        rules:[
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:[{loader:'style-loader'},{loader:'css-loader'}]
            },
            {
                test:/\.less$/,
                exclude:/node_modules/,
                use:[{loader:'style-loader'},{loader:'css-loader'},{loader:'less-loader'},{loader:'postcss-loader'}]
            },
            {   
                test:/\.(png|jpe?g|gif)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash].[ext]',
                            limit: 2048,
                            outputPath: 'images/',
                            publicPath: '/img'
                        }
                    }
                ]
            },
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader',
                    // options: {
                    //     presets:["@babel/preset-env"]
                    // },
                },
                exclude:/node_modules/,
            }
        ]
    },
    //插件
    plugins:[
        ...newHtmlWebpackPlugins,
        // new htmlWebpackPlugins({
        //     filename:path.resolve(DIST_PATH,'index.html'),
        //     title:'树鱼充值平台',
        //     template:path.resolve(__dirname,'./index.html'),
        //     inject:true,
        //     hash:true,
        //     favicon:path.resolve(__dirname,'./fav.ico')
        // }),
        //多页面开发 类似上面的js处理
        
    ],  
}