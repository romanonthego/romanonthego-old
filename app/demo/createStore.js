import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import devToolsExtension from 'app/flux/stores/utils/devToolsExtension'

export default function create(initialState = {}) {
  const reducer = combineReducers({
    nullReducer: (state = {}) => state,
  })

  const finalCreateStore = compose(applyMiddleware(thunk), devToolsExtension())(
    createStore,
  )

  return finalCreateStore(reducer, initialState)
}
