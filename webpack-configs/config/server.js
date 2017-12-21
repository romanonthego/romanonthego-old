import path from 'path'
import dotenv from './utils/dotenv'
import node from './utils/node'
import {server as serverResolve} from './utils/resolve'
import {server as serverOutput} from './utils/output'
import stats from './utils/stats'
import {server as serverEntry, prerender as prerenderEntry} from './utils/entry'
// loaders
import mustache from './loaders/mustache'
import statics from './loaders/statics'
import {server as serverBabelLoader} from './loaders/babel'
import {server as serverCss} from './loaders/css'
// plugins
import globals from './plugins/globals'
import {moduleConcatenation, namedModules} from './plugins/webpack'
import extractCss from './plugins/extractCss'
import sourceMaps from './plugins/sourceMaps'
import progress from './plugins/progress'

const config = {
  __DIR: path.resolve('./'),
}

// setting up dotenv
dotenv(config.__DIR)

const shared = {
  context: config.__DIR,
  resolve: serverResolve(config),
  ...node,
}

export function serverConfig(options) {
  const {production = false} = options
  const development = !production
  const props = {...config, ...options}

  return {
    ...shared,
    stats: 'none',
    devtool: production ? 'source-map' : 'eval',
    entry: serverEntry(props),
    output: serverOutput(props),
    module: {
      rules: [
        mustache(props),
        statics(props),
        serverBabelLoader(props),
        serverCss(props),
      ],
    },
    plugins: [
      globals(props),
      moduleConcatenation(props),
      namedModules(props),
      extractCss(props),
      development ? progress({entry: 'server'}) : null,
      production ? sourceMaps() : null,
    ].filter(Boolean),
  }
}

export function prerenderConfig(options) {
  const {production = false} = options
  const development = !production
  const props = {...config, ...options}

  return {
    ...shared,
    stats: 'none',
    devtool: production ? 'source-map' : 'eval',
    stats: stats(),
    entry: prerenderEntry(),
    output: serverOutput(props),
    module: {
      rules: [mustache(), statics(), serverBabelLoader(), serverCss(props)],
    },
    plugins: [
      globals(props),
      moduleConcatenation(props),
      namedModules(props),
      extractCss(props),
      development ? progress({entry: 'prerender'}) : null,
    ].filter(Boolean),
  }
}
