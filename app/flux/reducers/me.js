import {types} from 'app/flux/actions/me'
import buildReducer from 'app/flux/utils/buildReducer'

const initialState = {
  fastMode: false,
  emailUncovered: false,
}

export default buildReducer(initialState, {
  [types.SET_FAST_MODE]: (state, {fastMode}) => {
    return {
      ...state,
      fastMode,
    }
  },

  [types.SET_EMAIL_UNCOVERED]: (state, {emailUncovered}) => {
    return {
      ...state,
      emailUncovered,
    }
  },
})
