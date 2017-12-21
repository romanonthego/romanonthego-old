import babelOptions from './babelOptions'

const shared = {
  test: /\.js|jsx$/,
  exclude: /node_modules(?!.+-es6)/,
}

export const server = (config = {}) => {
  return {
    ...shared,
    use: [
      {
        loader: 'babel-loader',
        options: babelOptions({...config, useModules: false, node: true}),
      },
    ],
  }
}

export const browser = (config = {}) => {
  const {production} = config

  if (production) {
    return {
      ...shared,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions({...config, addReactOptimization: true}),
        },
      ],
    }
  }

  return {
    ...shared,
    use: [
      {
        loader: 'react-hot-loader/webpack',
      },
      {
        loader: 'babel-loader',
        options: babelOptions(config),
      },
    ],
  }
}
