const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    mode: 'production',
    devtool: 'source-map',
    devServer:
    {
        contentBase: './dist',
        open: true,
        host: '10.93.180.23'
    },
    entry: path.resolve(__dirname, '../src/index.js'),
    output:
    {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins:
    [
        new MiniCssExtractPlugin,
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([ { from: 'static' } ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        })
    ],
    module:
    {
        rules:
        [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.styl$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: 
                [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'images/'}
                    }
                ]
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/,
                use: 
                [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'fonts/'}
                    }
                ]
            }
        ]
    }
}
