import 'isomorphic-fetch'
import 'app/styles/app.styl'
import {render} from 'react-dom'
import React from 'react'
import createStore from 'app/flux/stores'
import {browserHistory} from 'react-router'
import App from 'app/components/App'
import window from 'app/utils/window'
import attachHistoryListeners from './utils/attachHistoryListeners'
import importCore from './utils/importCore'

const initialState = window.__INITIAL_STATE__

importCore().then(() => {
  createStore(browserHistory, initialState).then(({store, history}) => {
    attachHistoryListeners(history)

    render(
      <App store={store} history={history} />,
      document.getElementById('app')
    )
  })
})


