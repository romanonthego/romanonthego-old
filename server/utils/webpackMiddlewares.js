import webpack from 'webpack'
import webpackDevMiddlewareConstructor from 'webpack-dev-middleware'
import webpackHotMiddlewareConstructor from 'webpack-hot-middleware'
import configBrowser from 'webpack-configs/browser.development.babel'

const compiler = webpack(configBrowser)

export const webpackDevMiddleware = webpackDevMiddlewareConstructor(compiler, {
  noInfo: true,
  publicPath: '/assets',
  stats: {
    colors: true,
  },
})

export const webpackHotMiddleware = webpackHotMiddlewareConstructor(compiler, {
  log: console.log,
  publicPath: '/assets',
})
