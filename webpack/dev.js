const merge = require('webpack-merge')

const common = require('./common')

process.env.NODE_ENV = 'development'
module.exports = merge(common, {
  mode: 'development',
  output: { filename: 'index.js' }
})
