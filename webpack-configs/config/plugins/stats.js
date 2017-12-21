import StatsPlugin from 'stats-webpack-plugin'

export default () =>
  new StatsPlugin('stats.json', {
    chunkModules: true,
    exclude: /node_modules(?!.+-es6)/,
    hash: false,
    version: false,
    timings: false,
    assets: true,
    chunks: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: false,
    errorDetails: false,
    chunkOrigins: false,
  })
