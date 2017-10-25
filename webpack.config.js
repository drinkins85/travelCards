const path = require('path');

const  PATHS = {
    source: path.join(__dirname,'src'),
    build: path.join(__dirname,'build')
};

module.exports = {
    entry: PATHS.source+'/js/index.js',
    output: {
        path: PATHS.build+'/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    devServer: {
        stats: 'errors-only',
        port: 3000,
        contentBase: "./build",
        compress: true,
        publicPath: "/js/"
    }
};
