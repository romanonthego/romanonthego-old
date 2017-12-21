import path from 'path'
import express from 'express'
import staticGzip from 'express-static-gzip'

// server port
export const PORT = Number(process.env.PORT || 8080)

// public/assets for production mainly, but public should be mounted in dev
// for favicons and stuff like that (some browsers required it to be served from root url)
// NOTE: try not to place where any images/fonts etc, serve them as assets via webpack
export const publicMiddeware = express.static(path.join('public'))

export const assetsMiddleware = staticGzip(path.join('build'), {
  maxAge: '365d',
})

export function closingSlashMiddleware(req, res, next) {
  const asArray = req.url.split('?')
  const beforeQuery = asArray[0]
  const query = asArray[1] ? `?${asArray[1]}` : ''

  if (beforeQuery.substr(-1) === '/') {
    next()
  } else {
    res.redirect(301, `${beforeQuery}/${query}`)
  }
}
