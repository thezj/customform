const path = require('path')
const webpack = require('webpack')
const autohtml = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const addAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');

const extractCSS = new ExtractTextPlugin({
    filename: './style/stylemain.css'
});
const extractLESS = new ExtractTextPlugin({
    filename: './style/styleless.css'
});
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader'
                }],
                //publicPath可以理解为在现有路径下加前置路径
                //如果不设置发布目录为上一级，在当前情况，style中的url会指向style中的下一层目录style/style/
                publicPath: '../'
            })
        }, {
            test: /\.(png|svg|jpg|gif|ttf|woff|eot|woff2)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'style/[name].[ext]',
                }
            }]
        }, {
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.less$/,
            use: extractLESS.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                //publicPath可以理解为在现有路径下加前置路径
                //如果不设置发布目录为上一级，在当前情况，style中的url会指向style中的下一层目录style/style/
                publicPath: '../'
            })
        }]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        extractCSS,
        extractLESS,
        new UglifyJSPlugin(),
        new addAssetHtmlPlugin([{
            filepath: path.resolve(__dirname, './jquery.min.js'),
            includeSourcemap: false
        }, {
            filepath: path.resolve(__dirname, './echarts.common.min.js'),
            includeSourcemap: false
        }, {
            filepath: path.resolve(__dirname, './lodash.core.min.js'),
            includeSourcemap: false
        }, {
            filepath: path.resolve(__dirname, './distdll/vender.js'),
            includeSourcemap: false
        }]),
        new CleanWebpackPlugin(['dist']),
        new autohtml({
            title: 'test webpack',
            template: './template.html',
            hash: true,
            inject: 'body'
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("./distdll/vendermanifest.json"),
        }),
        new ManifestPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 指定公共 bundle 的名称。
        })
    ]

};