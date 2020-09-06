const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const terserPlugin = require("terser-webpack-plugin");
const commomConfig = require('./webpack.common.js');
const DIST_PATH = path.resolve(__dirname, '../dist');

const prodConfig = {
    mode: 'production',
    output: {
        path: DIST_PATH,
        filename: '[name].[contenthash:5].js',
        // chunkFilename:'[vendors].[contenthash:5].js'
    },
    
    optimization: {
        minimize: true,
        minimizer: [
            // new terserPlugin({
            //     cache: true,
            //     parallel: 4
            // }),
            new optimizeCssAssetsWebpackPlugin({

            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [{ loader: miniCssExtractPlugin.loader }, { loader: 'css-loader' }, { loader: 'less-loader' }, { loader: 'postcss-loader' }]
            }
        ]
    },
    //插件
    plugins: [
        new miniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
            chunkFilename: 'styles/[id].[contenthash].css'
        })
    ],
}

module.exports = merge(commomConfig, prodConfig)