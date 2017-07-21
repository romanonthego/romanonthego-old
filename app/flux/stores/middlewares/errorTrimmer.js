import omit from 'lodash-es/omit'
import get from 'lodash-es/get'
import {createTransform} from 'redux-persist'

export default createTransform(
  (state) => {
    const data = get(state, 'data', {})

    return {
      ...state,
      data: omit(data, ['error']),
    }
  },
  (state) => {
    const data = get(state, 'data', {})

    return {
      ...state,
      data: omit(data, ['error']),
    }
  },
  {
    whitelist: ['account'],
  },
)
