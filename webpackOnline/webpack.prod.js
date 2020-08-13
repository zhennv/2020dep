const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const commomConfig = require('./webpack.common.js');
const DIST_PATH = path.resolve(__dirname,'./dist');

const prodConfig = {
    mode:'production',
    output:{
        path:DIST_PATH,
        filename:'[name].[contenthash:5].js',
        chunkFilename:'[vendors].[contenthash:5].js'
    },
    //插件
    plugins:[
        
    ],
}

module.exports = merge(commomConfig,prodConfig)