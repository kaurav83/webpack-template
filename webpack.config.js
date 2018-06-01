const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const common = {
    context: path.resolve(__dirname, 'src'),

    entry: './index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // mode: "development",

    watch: true,

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        overlay: true, // если в скрипте возникнет ошибка, выдаст нам ёё на экран
        compress: true,
        port: 9000
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // если в модулях уже есть код переработанный babel-ом то он не будет заново прогоняться через babel 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-3']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', MiniCssExtractPlugin.loader, 'css-loader'
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
        }),

        new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        // new ExtractTextPlugin("style.css"),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './index.html',
            filename: 'index.html'
        })
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    // эта проверка определяет, если сборка для production то никакие sourcec-maps не срабатывают, если для development то будут отрабатывать source-maps
    // source-map нужен для отлова ошибок на этапе компиляции и в консоли браузера у нас будет возможность посмотреть в каком именно модуле (файле) она сработала.
    common.devtool = production ?
        false
        :
        'eval-sourcemap';

    return common;
}