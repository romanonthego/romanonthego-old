import throng from 'throng'
import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import Raven from 'raven'
import prerender from 'app/entries/prerender/production'
import {PORT, publicMiddeware, assetsMiddleware} from './utils/shared'
import demoMiddleware from './utils/demoMiddleware'
import startMessage from './utils/startMessage'
import getStatics from './utils/getStatics'

const workers = process.env.WEB_CONCURRENCY || 1

Raven.config(GLOBALS.SENTRY_DSN, {
  captureUnhandledRejections: true,
}).install()

function start() {
  const statics = getStatics()
  const app = express()

  // security middleware
  // https://github.com/helmetjs/helmet - read more
  app.use(helmet())

  app.use(morgan('dev'))

  app.use(cookieParser())

  // gzip all the things
  app.use(compression())

  app.use('/', publicMiddeware)
  app.use('/assets', assetsMiddleware)

  // demo
  app.use('/__demo', demoMiddleware(statics))

  // sentry
  app.use(Raven.requestHandler())

  app.use('/', (req, res) => prerender(req, res, statics))

  // sentry error hadler. must be last one
  app.use(Raven.errorHandler())

  app.listen(PORT, startMessage('production', PORT))
}

Raven.context(() => {
  throng({
    start,
    workers,
    lifetime: Infinity,
  })
})

