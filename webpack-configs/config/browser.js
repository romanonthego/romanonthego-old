import path from 'path'
import dotenv from './utils/dotenv'
import {browser as browserResolve} from './utils/resolve'
import {browser as browserOutput} from './utils/output'
import stats from './utils/stats'
import performance from './utils/performance'
import {browser as browserEntry} from './utils/entry'
// loaders
import mustache from './loaders/mustache'
import statics from './loaders/statics'
import {browser as browserBabelLoader} from './loaders/babel'
import {browser as browserCss} from './loaders/css'
// plugins
import globals from './plugins/globals'
import {moduleConcatenation, hmr, namedModules} from './plugins/webpack'
import {vendor} from './plugins/chunks'
import extractCss from './plugins/extractCss'
import uglify from './plugins/uglify'
import analyzeBundle from './plugins/analyze'
import statsPlugin from './plugins/stats'
import progress from './plugins/progress'
import compression from './plugins/compression'

const config = {
  __DIR: path.resolve('./'),
}

// setting up dotenv
dotenv(config.__DIR)

export function browserConfig(options) {
  const {production = false, analyze = false} = options
  const development = !production
  const props = {...config, ...options}

  return {
    context: config.__DIR,
    resolve: browserResolve(config),
    devtool: production ? 'source-map' : 'cheap-module-source-map',
    ...(production ? {performance: performance()} : {}),
    stats: stats(),
    entry: browserEntry(props),
    output: browserOutput(props),
    module: {
      rules: [
        mustache(props),
        statics(props),
        browserBabelLoader(props),
        browserCss(props),
      ],
    },
    plugins: [
      globals(props),
      moduleConcatenation(props),
      namedModules(props),
      vendor(),
      statsPlugin(props),
      development ? hmr() : null,
      development ? progress({entry: 'browser'}) : null,
      production ? uglify() : null,
      production ? extractCss(props) : null,
      production ? compression(props) : null,
      analyze ? analyzeBundle() : null,
    ].filter(Boolean),
  }
}
