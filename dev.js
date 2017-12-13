const path = require('path')
const webpack = require('webpack')
const autohtml = require('html-webpack-plugin')
const bundleanalyzerplugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const addAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const extractCSS = new ExtractTextPlugin('stylemain.css');
const extractLESS = new ExtractTextPlugin('styleless.css');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.(png|svg|jpg|gif|ttf|woff|eot|woff2)$/,
            use: ['file-loader']
        }, {
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.less$/,
            use: extractLESS.extract(['css-loader', 'less-loader'])
        }]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8888
    },
    plugins: [
        extractCSS,
        extractLESS,
        new addAssetHtmlPlugin([{
            filepath: path.resolve(__dirname, './jquery.min.js'),
            includeSourcemap: false
        }, {
            filepath: path.resolve(__dirname, './echarts.common.min.js'),
            includeSourcemap: false
        }, {
            filepath: path.resolve(__dirname, './lodash.core.min.js'),
            includeSourcemap: false
        }]),
        new autohtml({
            title: 'test webpack',
            template: './template.html',
            hash: true,
            inject: 'body'
        }), new bundleanalyzerplugin({
            analyzerPort: 8889
        })
    ]

};