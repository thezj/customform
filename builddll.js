const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    entry: {
        vender: ['vue', 'axios', 'vuex', 'vue-router', 'element-ui']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'distdll'),
        library: '[name]'
    },
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif|ttf|woff|eot|woff2)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[ext]'
                }
            }]
        }, {
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DllPlugin({
            context: __dirname,
            name: "[name]",
            path: path.join(__dirname, "distdll/[name]manifest.json"),
        })
    ]

};