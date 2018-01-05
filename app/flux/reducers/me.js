import {types} from 'app/flux/actions/me'
import buildReducer from 'app/flux/utils/buildReducer'

const initialState = {
  alreadyVisited: false,
  emailUncovered: false,
}

export default buildReducer(initialState, {
  [types.SET_ALREADY_VISITED]: (state, {alreadyVisited}) => {
    return {
      ...state,
      alreadyVisited,
    }
  },

  [types.SET_EMAIL_UNCOVERED]: (state, {emailUncovered}) => {
    return {
      ...state,
      emailUncovered,
    }
  },
})
