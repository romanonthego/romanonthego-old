import config from './config'
import node from './config/node'
import firebasePolymorphicImport from './config/firebasePolymorphicImport'

export default {
  ...node,

  stats: config.stats,

  resolve: {
    ...config.resolve,
    symlinks: false,
    alias: {
      ...config.resolve.alias,
      ...firebasePolymorphicImport('server'),
    }
  },

  entry: {
    prerender: './app/entries/prerender/production.js',
  },

  output: {
    filename: config.output.filename,
    path: config.output.path,
    publicPath: config.output.publicPath,
    library: 'prerender',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      ...config.module.rulesServer,
    ]
  },

  plugins: [
    config.plugins.globals,
    config.plugins.extractCss,
  ]
}
