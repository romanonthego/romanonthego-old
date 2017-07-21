export default function(initialState, handlers) {
  return (state = initialState, {type, payload}) => {
    return handlers[type] ? handlers[type](state, payload) : state
  }
}
