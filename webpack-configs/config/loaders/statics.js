export default (config = {}) => {
  const {production} = config

  return {
    test: /\.(svg|png|jpe?g|woff)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: production ? '[name]@[hash:base64:5].[ext]' : '[name].[ext]',
      },
    },
  }
}
