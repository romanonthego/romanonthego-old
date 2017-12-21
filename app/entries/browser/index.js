import 'isomorphic-fetch'
import 'app/styles/app.styl'
import {render} from 'react-dom'
import React from 'react'
import createStore from 'app/flux/stores'
import {browserHistory} from 'react-router'
import {AppContainer} from 'react-hot-loader'
import App from 'app/components/App'
import window from 'app/utils/window'
import attachHistoryListeners from './utils/attachHistoryListeners'

const initialState = window.__INITIAL_STATE__

createStore(browserHistory, initialState).then(({store, history}) => {
  attachHistoryListeners(history)

  const renderApp = AppComponent =>
    render(
      <AppContainer>
        <AppComponent store={store} history={history} />
      </AppContainer>,
      document.getElementById('app'),
    )

  renderApp(App)

  if (module.hot) {
    module.hot.accept('app/components/App', () => {
      const NewApp = require('app/components/App')
      renderApp(NewApp)
    })
  }
})
