export default function(options = {}) {
  const {
    useModules = false,
    // stage = 2,
    addReactOptimization = false,
    node = false,
  } = options

  let plugins = [
    'add-module-exports',
    'transform-runtime',
    'syntax-dynamic-import',
    ['transform-object-rest-spread', {useBuiltIns: true}],
    'transform-class-properties',
    'transform-decorators-legacy',
  ]

  if (addReactOptimization) {
    plugins = [
      ...plugins,
      'transform-react-constant-elements',
      'transform-react-inline-elements'
    ]
  }

  const envTargets = node ? {node: 7} : {
    chrome: 56,
    safari: 10,
    firefox: 51,
    // edge: 14,
  }

  const presets = [
    'react',
    ['env',
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
    presets,
    plugins,
    // ignore: [],
    // babelrc: false,
  }
}
