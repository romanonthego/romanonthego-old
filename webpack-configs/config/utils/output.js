import path from 'path'

export function server(config = {}) {
  const {__DIR} = config

  return {
    filename: '[name].js',
    chunkFilename: '[name].js',
    sourceMapFilename: '[file].map',
    path: path.join(__DIR, 'build'),
    publicPath: '/assets/',
    library: 'server',
    libraryTarget: 'commonjs2',
  }
}

export function browser(config) {
  const {__DIR, production} = config

  if (production) {
    return {
      filename: '[name]@[chunkhash:12].js',
      chunkFilename: '[name]@[chunkhash:12].js',
      sourceMapFilename: '[file].map',
      path: path.join(__DIR, 'build'),
      publicPath: '/assets/',
    }
  }

  return {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.join(__DIR, 'build'),
    publicPath: '/assets/',
  }
}
