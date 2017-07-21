import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import {PORT, publicMiddeware} from './utils/shared'
import {webpackDevMiddleware, webpackHotMiddleware} from './utils/webpackMiddlewares'
import startMessage from './utils/startMessage'
import getPrerender from './utils/getPrerender'
import demoMiddleware from './utils/demoMiddleware'
import noPrerenderTemplate from './utils/templateNoPrerender.mustache'

const statics = {
  js: [
    {name: 'manifest.js'},
    {name: 'vendor.js'},
    {name: 'app.js'},
    // {name: 'demo.js'},
  ]
}

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
app.use('/__demo', demoMiddleware(statics))

app.use(webpackDevMiddleware)
app.use(webpackHotMiddleware)

app.use('/', (req, res) => {
  if (prerender) {
    prerender(req, res, statics)
  } else {
    res.send(noPrerenderTemplate({timeout: 3}))
  }
})

app.listen(PORT, startMessage('development', PORT))
