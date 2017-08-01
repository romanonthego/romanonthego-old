import buildReducer from 'app/utils/flux/buildReducer'
import {types} from 'app/flux/actions/loadingBar'

const initialState = {
  shown: false,
  error: false,
}

export default buildReducer(initialState, {
  [types.SHOW]: (state, action) => ({
    shown: true,
    error: false,
  }),

  [types.HIDE]: (state, action) => initialState,

  [types.HIDE_WITH_ERROR]: (state, action) => ({
    shown: false,
    error: true,
  }),

  [types.RESET]: () => initialState
})
