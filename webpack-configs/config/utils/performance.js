export default function detPerformance(config = {}) {
  const {
    hints = 'warning',
    maxAssetSize = 250 * 1000,
    maxEntrypointSize = 300 * 1000,
    assetFilter = assetFilename => {
      return assetFilename.endsWith('.js')
    },
    ...otherOptions
  } = config

  return {
    hints,
    maxAssetSize,
    maxEntrypointSize,
    assetFilter,
    ...otherOptions,
  }
}
