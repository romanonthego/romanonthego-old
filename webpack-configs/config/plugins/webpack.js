import webpack from 'webpack'

export const moduleConcatenation = () =>
  new webpack.optimize.ModuleConcatenationPlugin()

export const hmr = () => new webpack.HotModuleReplacementPlugin()

export const namedModules = () => new webpack.NamedModulesPlugin()
