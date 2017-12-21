import webpack from 'webpack'

export default ({production = true} = {}) =>
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: production,
    extractComments: false,
    warningsFilter: () => false,
    compress: {
      warnings: false,
      drop_console: false,
    },
  })
