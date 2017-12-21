import CompressionPlugin from 'compression-webpack-plugin'

export default (config = {}) => {
  return new CompressionPlugin()
}
