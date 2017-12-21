import fileSystem from 'fs'
import filter from 'lodash/filter'

const getAsset = (stats, name, ext = 'js') => {
  const index = ext === 'js' ? 0 : 1
  const defaultAssetName = `${name}.${ext}`
  const asset = stats.assetsByChunkName[name]

  if (typeof asset === 'string') {
    return asset
  }

  return asset[index] || defaultAssetName
}

const getFonts = (stats, extention = 'woff') => {
  return filter(stats.assets, ({name}) => {
    return name.endsWith(`.${extention}`)
  }).map(({name}) => ({name}))
}

export function development(entry = 'app') {
  return {
    js: [{name: 'vendor.js'}, {name: `${entry}.js`}],
  }
}

export function production(entry = 'app') {
  // requiring at runtime is cumbersome :(
  let stats = fileSystem.readFileSync('build/stats.json')

  // do not wrap in try-catch. it should fail if something went wrong.
  stats = JSON.parse(stats)

  return {
    // js
    js: [
      // {name: getAsset(stats, 'manifest')},
      {name: getAsset(stats, 'vendor')},
      {name: getAsset(stats, entry)},
    ],

    // only one css
    css: [{name: getAsset(stats, entry, 'css')}],

    // fonts to get them loaded before the css
    fonts: getFonts(stats, 'woff'),

    // lazy-loading js and stuff
    preloadJs: [
      // {name: getAsset(stats, 'firebase')},
      // {name: getAsset(stats, 'uploadcare')},
      // {name: getAsset(stats, 'core-js')},
    ],
  }
}
