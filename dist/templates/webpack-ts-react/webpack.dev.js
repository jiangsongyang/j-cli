const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: process.env.NODE_ENV,
  devServer: {
    port: '8080',
    hot: true,
    open: true,
    historyApiFallback: true,
  },
})
