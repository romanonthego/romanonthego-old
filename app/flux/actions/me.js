import typesWithPrefix from 'app/flux/utils/typesWithPrefix'

export const types = typesWithPrefix('me', {
  SET_FAST_MODE: 'SET_FAST_MODE',
  SET_EMAIL_UNCOVERED: 'SET_EMAIL_UNCOVERED',
})

export function setFastMode(fastMode = false) {
  return {
    type: types.SET_FAST_MODE,
    payload: {
      fastMode,
    },
  }
}

export function setEmailUncovered(emailUncovered = false) {
  return {
    type: types.SET_EMAIL_UNCOVERED,
    payload: {
      emailUncovered,
    },
  }
}
