const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      calendar: './src/calendar.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
};