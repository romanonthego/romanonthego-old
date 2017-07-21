import withBrowserCookies from 'app/utils/withBrowserCookies'

function parse(value) {
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

export const types = {
  SET_FAST_MODE: 'SET_FAST_MODE',
  SET_EMAIL_UNCOVERED: 'SET_EMAIL_UNCOVERED',
}

// only on server side
export function setStateFromCookies(dispatch, {fastMode, emailUncovered}) {
  if (fastMode !== undefined) {
    dispatch(setFastMode(parse(fastMode)))
  }

  if (emailUncovered !== undefined) {
    dispatch(setEmailUncovered(parse(emailUncovered)))
  }
}

export function setFastMode(fastMode = false) {
  withBrowserCookies((cookies) => cookies.set('fastMode', fastMode))

  return {
    type: types.SET_FAST_MODE,
    payload: {
      fastMode,
    },
  }
}

export function setEmailUncovered(emailUncovered = false) {
  withBrowserCookies((cookies) => cookies.set('emailUncovered', emailUncovered))

  return {
    type: types.SET_EMAIL_UNCOVERED,
    payload: {
      emailUncovered,
    },
  }
}

