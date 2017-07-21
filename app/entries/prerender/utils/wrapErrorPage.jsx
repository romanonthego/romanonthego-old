import React from 'react'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'
import ServerErrorPage from 'app/components/Pages/Errors/ServerErrorPage'
import renderPage from './renderPage'

// rendering error page
// trying render smart page with profile etc
// and then pure page with just dumb text
export default function wrapErrorPage(ErrorPage, statics, store) {
  if (!store) {
    return (props = {}) => {
      const html = renderToString(<ServerErrorPage {...props} skipLayout />)

      return renderPage(html, null, {}, statics)
    }
  }

  return (props = {}) => {
    try {
      const html = renderToString(
        <Provider store={store} key="provider">
          <ErrorPage {...props} />
        </Provider>
      )

      return renderPage(html, store, {}, statics)
    } catch (errorPageRenderingError) { // we need to go deeper!
      return wrapErrorPage(ServerErrorPage, store, statics)({
        error: errorPageRenderingError,
      })
    }
  }
}
