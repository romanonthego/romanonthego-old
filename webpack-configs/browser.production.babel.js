import config from './config'
import firebasePolymorphicImport from './config/firebasePolymorphicImport'

export default {
  performance: config.performance,

  stats: config.stats,

  devtool: 'sourcemap',

  resolve: {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      ...firebasePolymorphicImport('browser'),
    }
  },

  entry: {
    app: [
      './app/entries/browser/index.js',
    ],
    demo: [
      './app/entries/browser/demo.js'
    ],
  },

  output: {
    filename: config.output.filenameWithHash,
    chunkFilename: config.output.chunkFilename,
    path: config.output.path,
    publicPath: config.output.publicPath,
  },

  module: {
    rules: [
      ...config.module.rulesProduction,
    ]
  },

  plugins: [
    config.plugins.globals,
    config.plugins.vendorChunk,
    config.plugins.replaceMomentLocales,
    config.plugins.manifestChunk,
    config.plugins.moduleConcatenation,
    config.plugins.extractCss,
    config.plugins.uglify,
    config.plugins.stats,
    ...(process.env.ANALYZE ? [config.plugins.bundleAnalyzer] : []),
  ],
}
