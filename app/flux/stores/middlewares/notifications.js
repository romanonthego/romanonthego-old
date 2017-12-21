import {show} from 'react-notification-system-redux'

export default ({dispatch}) => next => action => {
  if (action.notifcation) {
    const notifcation = {
      level: 'info',
      position: 'bc', // as for bottom-center
      autoDismiss: 0,
      ...action.notifcation,
    }

    delete action.notifcation

    dispatch(show(notifcation, notifcation.level))
  }

  next(action)
}
