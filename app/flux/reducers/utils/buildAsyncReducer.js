import get from 'lodash/get'

export default function buildAsyncReducer(key, initialState, handlers) {
  return (state = initialState, action) => {
    const actionKey = get(action, 'payload.key', null)

    if (!actionKey || actionKey !== key) {
      return state
    }

    return handlers[action.type] ? handlers[action.type](state, action) : state
  }
}
