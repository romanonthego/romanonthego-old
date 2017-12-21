import webpack from 'webpack'

export const vendor = () =>
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: ({context = '', resource = ''} = {}) => {
      // demo chunk hack
      const modulesToExclude = ['react-demo', 'react-demo-library', 'ramda']

      if (!context) {
        return false
      }

      if (modulesToExclude.some(moduleName => context.includes(moduleName))) {
        return false
      }

      // this assumes your vendor imports exist in the node_modules directory
      return context.includes('node_modules')
    },
  })

export const manifest = () =>
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
  })
