import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import {PORT, publicMiddeware} from './utils/expressMiddlewares'
import {
  webpackDevMiddleware,
  webpackHotMiddleware,
} from './utils/webpackMiddlewares'
import startMessage, {errorMessage} from './utils/startMessage'
import getPrerender from './utils/getPrerender'
import {development as developmentStatics} from './utils/getStatics'
import demoMiddleware from './utils/demoMiddleware'
import setupSentry from './utils/sentry'
import noPrerenderTemplate from './utils/noPrerender.mustache'

setupSentry()

const appStatics = developmentStatics('app')
const demoStatics = developmentStatics('demo')

const app = express()

let prerender = null

// getting prerender
getPrerender(app, GLOBALS.DEV_PRERENDER, (err, compiledPrerender) => {
  if (err) {
    prerender = null
  } else {
    prerender = compiledPrerender
  }
})

// better logger for development
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/', publicMiddeware)
app.use('/__demo', demoMiddleware(demoStatics))
app.use(webpackDevMiddleware)
app.use(webpackHotMiddleware)

app.use('/', (req, res) => {
  if (prerender) {
    prerender(req, res, appStatics)
  } else {
    res.send(noPrerenderTemplate.render({timeout: 3}))
  }
})

app
  .listen(PORT, startMessage('development', PORT))
  .on('error', errorMessage('development', PORT))
