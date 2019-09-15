const path = require('path');

module.exports = {
    entry: {
        App: "./public/javascript/scripts.js"
    },
    output: {
        path: path.resolve(__dirname, "./public/javascript"),
        filename: "scripts-bundled.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    mode: 'development'
}