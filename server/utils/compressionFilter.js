import compression from 'compression'

export default function(req, res) {
  // don't compress responses with this request header
  if (req.headers['x-no-compression']) {
    return false
  }

  // assets gziped by webpack, no compression needed
  if (req.url.startsWith('/assets') || req.url.startsWith('assets/')) {
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}
