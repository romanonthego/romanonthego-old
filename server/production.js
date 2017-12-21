import throng from 'throng'
import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import Raven from 'raven'
import prerender from 'app/entries/prerender/production'
import {
  PORT,
  publicMiddeware,
  assetsMiddleware,
} from './utils/expressMiddlewares'
import demoMiddleware from './utils/demoMiddleware'
import startMessage, {errorMessage} from './utils/startMessage'
import {production as productionStatics} from './utils/getStatics'
import compressionFilter from './utils/compressionFilter'
import setupSentry from './utils/sentry'

setupSentry()

function start() {
  const appStatics = productionStatics('app')
  const demoStatics = productionStatics('demo')

  const app = express()

  app.use(helmet())
  app.use(morgan('dev'))
  app.use(cookieParser())
  app.use(compression({filter: compressionFilter}))
  app.use('/', publicMiddeware)
  app.use('/assets', assetsMiddleware)
  app.use('/__demo', demoMiddleware(demoStatics))

  // sentry request handler - should go first
  if (GLOBALS.SENTRY_DSN_SERVER) {
    app.use(Raven.requestHandler())
  }
  // actuall app
  app.use('/', (req, res) => prerender(req, res, appStatics))

  // sentry error handler - should go last
  if (GLOBALS.SENTRY_DSN_SERVER) {
    app.use(Raven.errorHandler())
  }

  // app start
  app
    .listen(PORT, startMessage('production', PORT))
    .on('error', errorMessage('production', PORT))
}

const startWithThong = () => {
  throng({
    start,
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity,
  })
}

if (GLOBALS.SENTRY_DSN_SERVER) {
  Raven.context(() => startWithThong())
} else {
  startWithThong()
}
