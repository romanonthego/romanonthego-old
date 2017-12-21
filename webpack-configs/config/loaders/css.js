import path from 'path'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const stylesLoaders = (options = {}) => {
  const {__DIR, minimize = false, production = false} = options

  return [
    {
      loader: 'css-loader',
      options: {
        minimize,
        modules: true,
        localIdentName: '[name]-[local]-[hash:base64:5]',
        sourceMap: production,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: production,
        plugins: () => {
          return [autoprefixer]
        },
      },
    },
    {
      loader: 'stylus-loader',
      options: {
        import: [path.join(__DIR, 'app', 'styles', 'auto-import.styl')],
        preferPathResolver: 'webpack',
        sourceMap: production,
      },
    },
  ]
}

const shared = {
  test: /\.styl$/,
}

export const server = options => {
  return {
    ...shared,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [...stylesLoaders({...options, minimize: true})],
    }),
  }
}

export const browser = (config = {}) => {
  const {production} = config

  if (production) {
    return {
      ...shared,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [...stylesLoaders({...config, minimize: true})],
      }),
    }
  }

  return {
    ...shared,
    use: [
      {loader: 'style-loader', options: {sourceMap: production}},
      ...stylesLoaders(config),
    ],
  }
}
