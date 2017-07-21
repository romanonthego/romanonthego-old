import {makeBusy, makeFree} from 'app/flux/actions/busyManager'
import {END_GLOBAL_LOAD} from 'app/flux/constants'


const shouldFreeBusyManager = (type) => {
  if (typeof type === 'undefined') {
    return false
  }

  return type === END_GLOBAL_LOAD ||
    type.endsWith('_SUCCESS') ||
    type.endsWith('_FAIL') ||
    type.endsWith('_END')
}

export default ({dispatch}) => (next) => (action) => {
  const {
    type
  } = action

  if (shouldFreeBusyManager(type)) {
    dispatch(makeFree())
  } else if (action.busyKey) {
    const busyKey = action.busyKey
    delete action.busyKey

    dispatch(makeBusy(busyKey))
  }

  next(action)
}
