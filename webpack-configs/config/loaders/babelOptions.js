export default function(options = {}) {
  const {
    production = false,
    useModules = false,
    addReactOptimization = false,
    node = false,
  } = options

  const development = !production

  let plugins = [
    'add-module-exports',
    'transform-runtime',
    'syntax-dynamic-import',
    ['transform-object-rest-spread', {useBuiltIns: true}],
    'transform-class-properties',
    'transform-decorators-legacy',
  ].filter(Boolean)

  if (addReactOptimization) {
    plugins = [
      ...plugins,
      'transform-react-constant-elements',
      'transform-react-inline-elements',
    ]
  }

  const envTargets = node
    ? {node: 7}
    : {
        chrome: 56,
        safari: 10,
        firefox: 51,
        // edge: 14,
      }

  const presets = [
    'react',
    [
      'env',
      {
        targets: envTargets,
        loose: true,
        modules: useModules ? 'commonjs' : false,
        debug: false,
        useBuiltIns: true,
      },
    ],
  ]

  return {
    sourceMaps: production,
    presets,
    plugins,
    // ignore: [],
    // babelrc: false,
  }
}
