var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var DIST_PATH = path.resolve(__dirname, '../dist');
var htmlWebpackPlugins = require("html-webpack-plugin");
var copyWebpackPlugin = require("copy-webpack-plugin");
var terserPlugin = require("terser-webpack-plugin");

var SRC_PATH = path.resolve(__dirname, '../src');
var newEntries = {};
var files = glob.sync(SRC_PATH + '/ejs/*.js');
files.forEach(function (file, index) {
    var substr = file.match(/src\/ejs\/(\S*)\.js/)[1];
    newEntries[substr] = file;
})
var CUR_PATH = path.resolve(__dirname, '../');
var htmlFiles = glob.sync(CUR_PATH + '/*.html');
var htmlWebpackTemplates = [];
htmlFiles.forEach(function (file, index) {
    var substr = file.match(/\S*\/(\S*\.html)/)[1];
    htmlWebpackTemplates.push(new htmlWebpackPlugins({
        filename: path.resolve(DIST_PATH, substr),
        title: '树鱼充值平台',
        template: path.resolve(CUR_PATH, substr),
        inject: true,
        hash: true,
        favicon: path.resolve(__dirname, '../static/fav.ico'),
        minify: {
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
        },
        chunks: ["index"]
    }));
});
module.exports = {
    // entry:path.resolve(__dirname,'./src/index.js'),
    entry: newEntries,
    optimization: {
        minimize: true,
        minimizer: [
            new terserPlugin({
                cache: true,
                parallel: 4
            })
        ],
        splitChunks: {
            chunks: 'async',
        },
        runtimeChunk: {
            name: 'mainfest'
        }
    },
    resolve:{
        extensions:['.js','.vue','.json'],
        alias:{
            'vue$':'vue/dist/vue.esm.js',
            '@':CUR_PATH,
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
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash].[ext]',
                            limit: 2048,
                            outputPath: 'images/',
                            publicPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets:["@babel/preset-env"]
                    // },
                },
                exclude: /node_modules/,
            }
        ]
    },
    //插件

    plugins: [
        ...htmlWebpackTemplates,
        new copyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static'), to: DIST_PATH + '/static' }
            ]
        }),
        new webpack.DefinePlugin({
            'scene':JSON.stringify(process.env.scene)
        }),
        //全局引入url
        new webpack.ProvidePlugin({
            commonFun:[path.resolve(SRC_PATH,'js/config.js'),'default']
        })
    ],
}