import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default (config = {}) => {
  const {production} = config

  const filename = production ? '[name]@[contenthash:12].css' : '[name].css'

  return new ExtractTextPlugin({
    filename,
    allChunks: true,
    ignoreOrder: true,
  })
}
