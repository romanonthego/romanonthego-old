import 'isomorphic-fetch'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {createMemoryHistory} from 'react-router/es'
import {ReduxAsyncConnect, loadOnServer as loadData} from 'redux-connect'
import {Provider} from 'react-redux'
import routes from 'app/routes/routes'
import createStore from 'app/flux/stores'
import {selectUrl} from 'app/flux/selectors/routing'
import helpers from 'app/flux/utils/asyncConnectHelpers'
import renderPage from './utils/renderPage'
import getSideEffects from './utils/getSideEffects'
import matchUrlToRoutes from './utils/matchUrlToRoutes'
import getErrorPages, {getDumbServerErrorPage} from './utils/getErrorPages'

export default function prerender(req, res, statics) {
  const location = req.url
  const history = createMemoryHistory(location)
  const {cookies} = req
  const dumbErrorPage = getDumbServerErrorPage(statics)

  createStore(history, {}, cookies)
    .then(({store}) => {
      const {serverErrorPage, notFoundPage} = getErrorPages(statics, store)

      // server-side rendering at long last!
      matchUrlToRoutes({routes, location})
        .then(renderProps => {
          // 1. load data
          loadData({...renderProps, store, helpers})
            .then(() => {
              // 2.1 - redirect if needed by the redux-router
              const newUrl = selectUrl(store.getState())

              if (newUrl !== location) {
                res.redirect(newUrl)
                return
              }

              // 2.2 use `ReduxAsyncConnect` instead of `RoutingContext` and pass it `renderProps`
              const appHTML = renderToString(
                <Provider store={store} key="provider">
                  <ReduxAsyncConnect {...renderProps} />
                </Provider>,
              )

              // side effects.
              const {status, ...otherSideEffects} = getSideEffects()
              // 3. render the Redux initial data into the server markup
              const html = renderPage(appHTML, store, otherSideEffects, statics)
              // 4. actual response with (probably) 200 status and html prerendered
              res.status(status).send(html)
            })
            .catch(loadDataError => {
              res.status(500).send(serverErrorPage({loadDataError}))
            })
        })
        .catch(matchingError => {
          const {status = 500, error, url} = matchingError
          // not exactly an error, but still.
          if (status === 304) {
            return res.redirect(url)
          }

          if (status === 404) {
            return res.status(404).send(notFoundPage())
          }

          return res.status(status).send(serverErrorPage({error}))
        })
    })
    .catch(error => {
      res.status(500).send(dumbErrorPage({error}))
    })
}
