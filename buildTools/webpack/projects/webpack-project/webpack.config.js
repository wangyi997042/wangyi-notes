
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");


module.exports = {
    mode: 'development',
    entry: "./index.js",
    output: {
        // 公共线上文件http://cdn.baidu.com
        // 公共线上文件http://cdn.baidu.com
        // publicPath: '',
        path: path.resolve(__dirname, './build'),
        filename: 'index.js'
    },
    devtool:'cheap-module-eval-source-map',//'source-map', // 定位打包后错误代码，在源文件的哪儿
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    // url-loader 判断模块体积
                    loader: 'url-loader',
                    options:{
                        // name是打包前模块的名称， ext是打包前的模块格式
                        name: "[name]_[hash].[ext]",
                        outputPath: 'image/',
                        limit: 2048 // 超过这个大小，打包成图片，否则打包成base64
                    }
                },
                
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use:[ // loader 从后往前执行
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }

                ]
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                options:{
                    preset: [' "babel/preset-env"',
                    {
                        useBuiltIns: 'usage',
                        corejs: 2
                    }
                ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: '自己取名字'
        }),
        // 打包之前，先帮我们之前的文件先删除
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase: path.join(__dirname, "build"),
        open: true,
        port: 8888,
        hot: true,
        hotOnly:true,
        proxy: {
            '/api':{
                target: 'http://localhost:9001'
            }
        }
    }
}