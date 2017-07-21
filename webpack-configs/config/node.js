import path from 'path'
import excludeNodeModules from './excludeNodeModules'

export default {
  target: 'node',

  devtool: 'eval',

  externals: excludeNodeModules(),

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}
