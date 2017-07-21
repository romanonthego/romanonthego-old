import expressWebSocket from 'express-ws'
import prerenderDevelopment from 'app/entries/prerender/development'
import prerenderWebpackConfig from 'webpack-configs/prerender.development.babel'
import watchPrerenderCompiler from './watchPrerenderCompiler'

export default function getPrerender(app, usePrerender = false, onUpdate) {
  if (!usePrerender) {
    onUpdate(null, prerenderDevelopment)
    return
  }

  const appWs = expressWebSocket(app)

  app.ws('/prerender-status', (ws) => {
    ws.on('message', (msg = 'hello') => ws.send(msg))
  })

  watchPrerenderCompiler({
    config: prerenderWebpackConfig,

    onProgress: (percentage, msg) => {
      const message = JSON.stringify({percentage, msg})

      appWs.getWss()
        .clients
        .forEach((client) => client.send(message))
    },

    onDone: (err, compiledPrerender) => {
      if (err) {
        onUpdate(err, null)
      } else {
        onUpdate(null, compiledPrerender)
      }
    },
  })
}
