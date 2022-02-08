const path = require("path");
const webpack = require("webpack");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },

            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            disable: true,
                        },
                    }
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
    },
    // plugins: [
    //     new webpack.DefinePlugin({
    //         "process.env": {
    //             //Effect on the react lib size
    //             NODE_ENV: JSON.stringify("production")
    //         }
    //     })
    // ]
}



