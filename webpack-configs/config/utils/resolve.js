import path from 'path'

export const browser = (config = {}) => {
  const {__DIR} = config

  return {
    modules: [__DIR, 'node_modules'],

    extensions: ['.js', '.jsx'],
    mainFiles: [
      'index.connector.js',
      'index.connector.jsx',
      'index.js',
      'index.jsx',
    ],

    alias: {
      app: path.join(__DIR, 'app'),
      build: path.join(__DIR, 'build'),
      server: path.join(__DIR, 'server'),
      'webpack-configs': path.join(__DIR, 'webpack-configs'),
      sentry: path.join(__DIR, 'app', 'utils', 'reporting', 'sentry.browser'),
    },
  }
}

export const server = (config = {}) => {
  const {__DIR} = config

  return {
    modules: [__DIR, 'node_modules'],

    extensions: ['.js', '.jsx'],
    mainFiles: [
      'index.connector.js',
      'index.connector.jsx',
      'index.js',
      'index.jsx',
    ],

    alias: {
      app: path.join(__DIR, 'app'),
      build: path.join(__DIR, 'build'),
      server: path.join(__DIR, 'server'),
      'webpack-configs': path.join(__DIR, 'webpack-configs'),
      sentry: path.join(__DIR, 'app', 'utils', 'reporting', 'sentry.server'),
    },
  }
}
