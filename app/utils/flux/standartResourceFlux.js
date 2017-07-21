import buildReducer from 'app/utils/flux/buildReducer'

export function createReducer(actionTypes, idProp = 'id') {

  const initialState = {

    // for date from /list endpoints
    ids: [],
    byId: {},

    // for data from /:id endpoints (more complete items data)
    completeInfo: {},
  }

  return buildReducer(initialState, {

    // Sets list data
    [actionTypes.SET_ALL](state, payload) {
      const ids = []
      const byId = {}

      // for (const item of payload) {
      //   ids.push(item[idProp])
      //   byId[item[idProp]] = item
      // }

      payload.forEach((item) => {
        ids.push(item[idProp])
        byId[item[idProp]] = item
      })

      return {...state, ids, byId}
    },

    // Sets complete item data
    [actionTypes.SET](state, payload) {
      return {
        ...state,
        completeInfo: {...state.completeInfo, [payload.id]: payload},
      }
    },

  })

}



export function createActions(prefix) {

  const types = {
    SET: `${prefix}_SET`,
    SET_ALL: `${prefix}_SET_ALL`,
  }

  function set(x) {
    return {
      type: types.SET,
      payload: x,
    }
  }

  function setAll(x) {
    return {
      type: types.SET_ALL,
      payload: x,
    }
  }

  return {types, creators: {set, setAll}}
}

