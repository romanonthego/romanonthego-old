import buildReducer from 'app/flux/utils/buildReducer'
import {types} from 'app/flux/actions/loadingBar'

const initialState = {
  shown: false,
  error: false,
}

export default buildReducer(initialState, {
  [types.SHOW]: () => ({
    shown: true,
    error: false,
  }),

  [types.HIDE_WITH_ERROR]: () => ({
    shown: false,
    error: true,
  }),

  [types.HIDE]: () => initialState,

  [types.RESET]: () => initialState,
})
