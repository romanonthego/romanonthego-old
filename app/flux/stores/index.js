import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {routerReducer, syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import {reducer as reduxAsyncConnect} from 'redux-connect'
import {reducer as notifications} from 'react-notification-system-redux'
import {autoRehydrate} from 'redux-persist'
import reducers from 'app/flux/reducers'
import loadingBarMiddleware from './middlewares/loadingBar'
import notificationsMiddleware from './middlewares/notifications'
import busyManagerMiddleware from './middlewares/busyManager'
import storePersist from './storePersist'
import devToolsExtension from './utils/devToolsExtension'

export default function create(history, initialState, cookies) {
  const reducer = combineReducers({
    ...reducers,
    reduxAsyncConnect,
    notifications,
    routing: routerReducer,
  })

  const middlewares = [
    routerMiddleware(history),
    thunk,
    loadingBarMiddleware,
    notificationsMiddleware,
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
