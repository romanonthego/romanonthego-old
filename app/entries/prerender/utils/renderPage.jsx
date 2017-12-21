import serialize from 'serialize-javascript'
import {app, partials} from 'app/entries/templates/index'

export default function renderPage(html, store, sideEffects, statics) {
  let initialState = '{}'

  if (store && store.getState()) {
    initialState = serialize(store.getState(), {isJSON: true})
  }

  return app.render(
    {
      html,
      initialState,
      statics,
      GLOBALS, // passing GLOBALS defined by webpack
      ...sideEffects,
    },
    partials,
  )
}
