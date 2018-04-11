const path = require('path')

module.exports = {
  entry: './packages/react-redux-local/src/index.js',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: 'react-app' }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: { extensions: ['.js'] },
  output: {
    library: 'react-redux-local',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../packages/react-redux-local/dist')
  }
}
