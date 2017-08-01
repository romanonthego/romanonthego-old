import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {routerReducer, syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import {reducer as reduxAsyncConnect} from 'redux-connect'
import {autoRehydrate} from 'redux-persist'
import reducers from 'app/flux/reducers'
import loadingBarMiddleware from './middlewares/loadingBar'
import busyManagerMiddleware from './middlewares/busyManager'
import storePersist from './storePersist'
import devToolsExtension from './utils/devToolsExtension'

export default function create(history, initialState, cookies) {
  const reducer = combineReducers({
    ...reducers,
    reduxAsyncConnect,
    routing: routerReducer,
  })

  const middlewares = [
    routerMiddleware(history),
    thunk,
    loadingBarMiddleware,
    busyManagerMiddleware,
  ]

  const composedFunctions = [
    applyMiddleware(...middlewares),
    autoRehydrate({log: GLOBALS.DEV}),
    devToolsExtension(),
  ]

  const finalCreateStore = compose(...composedFunctions)(createStore)

  const store = finalCreateStore(reducer, initialState)

  return storePersist(store, cookies).then(() => {
    return {
      store,
      history: syncHistoryWithStore(history, store),
    }
  })
}
