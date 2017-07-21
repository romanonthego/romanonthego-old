import 'isomorphic-fetch'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, createMemoryHistory} from 'react-router/es'
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect'
import {Provider} from 'react-redux'

import routes from 'app/routes'
import createStore from 'app/flux/stores'
import helpers from 'app/flux/utils/asyncConnectHelpers'
import {onServer} from 'app/flux/utils/loaderFilters'

import renderPage from './utils/renderPage'
import getSideEffects from './utils/getSideEffects'
import getErrorPages, {getDumbServerErrorPage} from './utils/getErrorPages'

export default function prerender(req, res, statics) {
  const history = createMemoryHistory(req.url)
  const {cookies} = req

  createStore(history, undefined, cookies).then(({store}) => {
    // server-side rendering at long last!
    match({routes, location: req.url}, (matchError, redirect, renderProps) => {
      const {
        serverErrorPage,
        notFoundPage
      } = getErrorPages(statics, store)

      if (matchError) {
        res.status(500).send(serverErrorPage({error: matchError}))
        return
      }

      // redirect on server-side
      if (redirect) {
        res.redirect(redirect.pathname + redirect.search)
        return
      }

      if (renderProps) {
        // 1. load data
        const props = {
          ...renderProps,
          store,
          filter: onServer,
          helpers,
        }

        loadOnServer(props).then(() => {
          // 2. use `ReduxAsyncConnect` instead of `RoutingContext` and pass it `renderProps`
          const appHTML = renderToString(
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          )

          // side effects.
          const {status, ...otherSideEffects} = getSideEffects()

          // 3. render the Redux initial data into the server markup
          const html = renderPage(appHTML, store, otherSideEffects, statics)

          // 4. actual response with (probably) 200 status and html prerender
          res.status(status).send(html)
        })
        .catch((loadErr) => {
          res.status(500).send(serverErrorPage({error: loadErr}))
        })
      } else {
        res.status(404).send(notFoundPage())
      }
    })
  }).catch((storeError) => {
    const errorPage = getDumbServerErrorPage(statics)

    res.status(500).send(errorPage({error: storeError}))
  })
}
