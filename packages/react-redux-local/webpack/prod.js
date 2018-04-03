const merge = require('webpack-merge')

const common = require('./common')

process.env.NODE_ENV = 'production'

module.exports = merge(common, {
  mode: 'production',
  output: { filename: 'index.min.js' }
})
