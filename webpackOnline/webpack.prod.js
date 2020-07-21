const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const commomConfig = require('./webpack.common.js');
const DIST_PATH = path.resolve(__dirname,'./dist');


module.exports = merge(commomConfig,{
    mode:'production',
    //插件
    plugins:[
        
        
    ],
})