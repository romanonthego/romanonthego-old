export const server = (config = {}) => {
  const {production} = config

  if (production) {
    return {
      server: './server/production.js',
    }
  }

  return {
    server: './server/development.js',
  }
}

export const prerender = config => {
  return {
    prerender: './app/entries/prerender/production.js',
  }
}

export const browser = (config = {}) => {
  const {production} = config

  if (production) {
    return {
      app: ['babel-polyfill', './app/entries/browser/index.js'],
    }
  }

  return {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?overlay=true&reload=false',
      './app/entries/browser/index.js',
    ],
  }
}
