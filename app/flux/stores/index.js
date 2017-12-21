import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {
  routerReducer,
  syncHistoryWithStore,
  routerMiddleware,
} from 'react-router-redux'
import thunk from 'redux-thunk'
import {reducer as reduxAsyncConnect} from 'redux-connect'
import {autoRehydrate} from 'redux-persist'
import reducers from 'app/flux/reducers'
import reportError from 'app/utils/reporting'
import loadingBarMiddleware from './middlewares/loadingBar'
import storePersist from './storePersist'
import devToolsExtension from './utils/devToolsExtension'

export default function create(history, initialState = {}, cookies) {
  const reducer = combineReducers({
    ...reducers,
    reduxAsyncConnect,
    routing: routerReducer,
  })

  const middlewares = [routerMiddleware(history), thunk, loadingBarMiddleware]

  const composedFunctions = [
    applyMiddleware(...middlewares),
    autoRehydrate({log: GLOBALS.DEV}),
    devToolsExtension(),
  ]

  const store = compose(...composedFunctions)(createStore)(
    reducer,
    initialState,
  )

  return storePersist(store, cookies)
    .then(() => {
      return {
        store,
        history: syncHistoryWithStore(history, store),
      }
    })
    .catch(error => {
      reportError(error, {extra: {message: 'store initialization failed'}})
      // we will need to catch it later to show 500 error page
      throw error
    })
}
