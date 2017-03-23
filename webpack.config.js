// var webpack = require('webpack');


module.exports = {
    entry: {
        bundle: './js/my-app.js',
        tools: './js/tools.js'
    },
    output: {
        path: __dirname,
        filename: "./dist/[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/, loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ]
    }
}

