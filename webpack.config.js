const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [{
      test: /\.js?$/,
      use: [
        {
          loader: 'babel-loader',
          options: { presets: 'react-app' },
        }],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
