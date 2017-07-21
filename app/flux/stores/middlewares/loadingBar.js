import {
  showLoadingBar,
  hideLoadingBar,
  hideLoadingBarWithError
} from 'app/flux/actions/loadingBar'
import {
  BEGIN_GLOBAL_LOAD,
  END_GLOBAL_LOAD
} from 'app/flux/constants'

const shoudlDisplayLoading = (type) => {
  if (type === BEGIN_GLOBAL_LOAD) {
    return true
  }

  if (type.startsWith('@')) {
    return false
  }

  return type.endsWith('_START')
}

const shoudlHideLoading = (type) => {
  if (type === END_GLOBAL_LOAD) {
    return true
  }

  if (type.startsWith('@')) {
    return false
  }


  return type.endsWith('_SUCCESS') || type.endsWith('_END')
}

const shoudlHideLoadingWithError = (type) => {
  return type.endsWith('_FAIL')
}

export default ({dispatch}) => (next) => (action) => {
  next(action)

  const {
    type
  } = action

  if (typeof type === 'undefined') {
    return
  }

  if (shoudlDisplayLoading(type)) {
    dispatch(showLoadingBar())
  }

  if (shoudlHideLoadingWithError(type)) {
    dispatch(hideLoadingBarWithError())
  }

  if (shoudlHideLoading(type)) {
    dispatch(hideLoadingBar())
  }
}
