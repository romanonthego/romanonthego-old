const MAX = 2048

function normalizeSize(width, height, x) {
  let w = width * x
  let h = height * x

  if (w > MAX || h > MAX) {
    const vmax = Math.max(w, h)

    w = (w / vmax) * MAX
    h = (h / vmax) * MAX
  }

  return [Math.round(w), Math.round(h)]
}

export function isUploadcareUrl(url) {
  return url && url.indexOf('ucarecdn') !== -1
}

export function progressiveJpg(quality = 'normal') {
  return `-/quality/${quality}/-/format/jpeg/-/progressive/yes/`
}

export function png() {
  return '-/format/png/'
}

export function scaleCrop(params, x = 1) {
  const {
    width,
    height,
    center,
  } = params

  const [w, h] = normalizeSize(width, height, x)

  // using !center to get 'center/' by default
  return `-/scale_crop/${w}x${h}/${center === false ? '' : 'center/'}`
}

export function preview(params, x = 1) {
  const {
    width,
    height,
  } = params

  const [w, h] = normalizeSize(width, height, x)

  return `-/preview/${w}x${h}/`
}

export function blur(strength = 10) {
  return `-/blur/${strength}/`
}

export function removeTransforms(url) {
  if (!isUploadcareUrl(url)) {
    return url
  }
  const chunks = url.split('/')
  return chunks.length <= 4 ? url : `${chunks.slice(0, 4).join('/')}/`
}
