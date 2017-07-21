import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import window from 'app/utils/window'

const devToolsExtension = window.devToolsExtension ? window.devToolsExtension() : (f) => f

export default function create(initialState = {}) {
  const reducer = combineReducers({
    nullReducer: (state = {}) => state,
  })

  const finalCreateStore = compose(
    applyMiddleware(thunk),
    devToolsExtension
  )(createStore)

  return finalCreateStore(reducer, initialState)

}
