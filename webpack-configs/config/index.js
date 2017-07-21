import dotenv from 'dotenv'
import autoprefixer from 'autoprefixer'
import path from 'path'
import webpack from 'webpack'
import StatsPlugin from 'stats-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import BabiliWebpackPlugin from 'babili-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin'
import ButternutWebpackPlugin from 'butternut-webpack-plugin'
import composeGlobals from './composeGlobals'
import globals from './globals'
import babelOptions from './babelOptions'

const __DIR = path.resolve('./')

dotenv.config({
  path: path.join(__DIR, '.env'),
})

const nodeModulesRegex = /node_modules(?!.+-es6)/
const nodeEnvFromProcess = JSON.stringify(process.env.NODE_ENV || 'development')

const composedGlobals = {
  // node.js fixtures
  __dirname: JSON.stringify(__DIR),
  __filename: JSON.stringify(path.join(__DIR, 'index.js')),
  // react minification hach or something.
  // prevent warning in production console
  NODE_ENV: nodeEnvFromProcess,
  'process.env.NODE_ENV': nodeEnvFromProcess,
  // globals
  GLOBALS: composeGlobals(globals)
}

// how we handle css.
// it's a bit
const stylesLoaders = ({minimize = false} = {}) => {
  return [
    {
      loader: 'css-loader',
      options: {
        minimize,
        modules: true,
        localIdentName: '[name]-[local]-[hash:base64:5]',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => {
          return [
            autoprefixer
          ]
        }
      },
    },
    {
      loader: 'stylus-loader',
      options: {
        import: [
          path.join(__DIR, 'app', 'styles', 'vars.styl'),
          path.join(__DIR, 'app', 'styles', 'grid.styl'),
        ],
        preferPathResolver: 'webpack',
      },
    }
  ]
}

export default {
  context: __DIR,

  stats: {
    children: false,
    chunks: false,
    // Add built modules information to chunk information
    chunkModules: false,
    // Add the origins of chunks and chunk merging info
    chunkOrigins: false,
    modules: false,
    colors: true,
    // Add errors
    errors: true,
    // Add details to errors (like resolving log)
    errorDetails: true,
  },

  performance: {
    hints: 'warning',
    maxAssetSize: 250000,
    maxEntrypointSize: 300000,
    assetFilter: (assetFilename) => {
      return assetFilename.endsWith('.js')
    }
  },

  resolve: {
    modules: [
      __DIR,
      'node_modules',
    ],

    extensions: ['.js', '.jsx'],

    alias: {
      app: path.join(__DIR, 'app'),
      build: path.join(__DIR, 'build'),
      server: path.join(__DIR, 'server'),
      'webpack-configs': path.join(__DIR, 'webpack-configs'),
    },
  },

  output: {
    filename: '[name].js',
    // long term caching. only for production
    filenameWithHash: '[name]@[chunkhash:12].js',
    chunkFilename: '[name]@[chunkhash:12].js',
    path: path.join(__DIR, 'build'),
    publicPath: '/assets/',
  },

  module: {
    rulesServer: [
      {
        test: /\.js|jsx$/,
        exclude: nodeModulesRegex,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions({useModules: true, node: true}),
          },
        ],
      },
      {
        test: /\.mustache$/,
        use: [
          {
            loader: 'mustache-loader',
            options: {noShortcut: true},
          },
        ],
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [...stylesLoaders({minimize: true})]
        }),
      },
      {
        test: /\.(svg|png|jpe?g|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]@[hash:base64:5].[ext]',
          }
        },
      },
    ],
    rulesHot: [
      {
        test: /.styl$/,
        use: [{loader: 'style-loader'}, ...stylesLoaders()],
      },
      {
        test: /\.js|jsx$/,
        use: [
          {
            loader: 'react-hot-loader'
          },
          {
            loader: 'babel-loader',
            options: babelOptions(),
          },
        ],
        exclude: nodeModulesRegex,
      },
      {
        test: /\.(svg|png|jpe?g|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]@[hash:base64:5].[ext]',
          }
        },
      },
    ],
    rulesProduction: [
      {
        test: /\.js|jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions({addReactOptimization: true}),
          },
        ],
        exclude: nodeModulesRegex,
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [...stylesLoaders({minimize: true})]
        })
      },
      {
        test: /\.(svg|png|jpe?g|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]@[hash:base64:5].[ext]',
          }
        },
      },
    ]
  },

  plugins: {
    vendorChunk: new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({context = '', resource = ''} = {}) => {
        const modulesToExclude = [
          'react-demo',
          'ramda',
          'core-js',
        ]

        if (!context) {
          return false
        }

        if (modulesToExclude.some((moduleName) => context.includes(moduleName))) {
          return false
        }

        // this assumes your vendor imports exist in the node_modules directory
        return context.includes('node_modules')
      },
    }),
    manifestChunk: new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    // https://webpack.js.org/plugins/context-replacement-plugin/
    // https://github.com/moment/moment/issues/2373
    replaceMomentLocales: new webpack.ContextReplacementPlugin(
      /moment[\\/]locale$/,
      /^\.\/(ru)$/
    ),
    extractCss: new ExtractTextPlugin({
      filename: '[name]@[contenthash:12].css',
      allChunks: true,
      ignoreOrder: true,
    }),
    moduleConcatenation: new webpack.optimize.ModuleConcatenationPlugin(),
    uglify: new webpack.optimize.UglifyJsPlugin({
      extractComments: false,
      warningsFilter: () => false,
      compress: {
        warnings: false,
        drop_console: false,
      },
    }),
    globals: new webpack.DefinePlugin(composedGlobals),
    hmr: new webpack.HotModuleReplacementPlugin(),
    namedModules: new webpack.NamedModulesPlugin(),
    stats: new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [nodeModulesRegex],
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
    }),
    babili: new BabiliWebpackPlugin(),
    butternut: new ButternutWebpackPlugin(),
    bundleAnalyzer: new BundleAnalyzerPlugin(),
    progressBar: new ProgressBarWebpackPlugin(),
    sourceMapsBanner: new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    })
  },
}
