import get from 'lodash/get'
import {LOAD, LOAD_SUCCESS, LOAD_FAIL, CLEAR} from './constants'

export default function createAsyncReducer(key) {
  const initialState = {
    loading: false,
    loaded: false,
  }

  return (state = initialState, action) => {
    const actionKey = get(action, 'payload.key', null)

    if (!actionKey || actionKey !== key) {
      return state
    }

    switch (action.type) {
      case LOAD:
        return {
          ...state,
          loading: true,
          loaded: false,
        }
      case LOAD_SUCCESS:
        return {
          loading: false,
          loaded: true,
          data: action.payload.data,
        }
      case LOAD_FAIL:
        return {
          loading: false,
          loaded: false,
          error: action.payload.error,
        }
      case CLEAR:
        return {
          loading: false,
          loaded: false,
        }
      default:
        return state
    }
  }
}
