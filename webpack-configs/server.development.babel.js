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
    server: './server/development.js',
  },

  output: {
    filename: config.output.filename,
    path: config.output.path,
    publicPath: config.output.publicPath,
    library: 'server',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      ...config.module.rulesServer,
    ]
  },

  plugins: [
    config.plugins.globals,
  ]
}
