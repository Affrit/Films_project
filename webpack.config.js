const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: ['./js/index.js', './scss/style.scss'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.(s*)css$/,
            use: [
                miniCss.loader,
                'css-loader',
                'sass-loader',
            ]
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                    ],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './'),
        },
        compress: true,
        open: true,
        hot: true,
        port: 9000,
    },
    plugins: [
        new miniCss({
            filename: 'style.css',
        }),
    ]
};