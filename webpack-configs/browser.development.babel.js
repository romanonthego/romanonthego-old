import config from './config'
import firebasePolymorphicImport from './config/firebasePolymorphicImport'

export default {
  performance: {
    hints: false,
  },

  stats: config.stats,

  resolve: {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      ...firebasePolymorphicImport('browser'),
    }
  },


  entry: {
    app: [
      'webpack-hot-middleware/client?overlay=true&reload=false',
      './app/entries/browser/index.js',
    ],
    demo: [
      'webpack-hot-middleware/client?overlay=true&reload=false',
      './app/entries//browser/demo.js',
    ],
  },

  devtool: 'eval',

  output: {
    filename: config.output.filename,
    chunkFilename: config.output.chunkFilename,
    path: config.output.path,
    publicPath: config.output.publicPath,
  },

  module: {
    rules: [
      ...config.module.rulesHot,
    ]
  },

  plugins: [
    config.plugins.vendorChunk,
    config.plugins.manifestChunk,
    config.plugins.globals,
    config.plugins.hmr,
    config.plugins.namedModules,
  ],
}
