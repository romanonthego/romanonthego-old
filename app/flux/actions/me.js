import typesWithPrefix from 'app/flux/utils/typesWithPrefix'

export const types = typesWithPrefix('me', {
  SET_ALREADY_VISITED: 'SET_ALREADY_VISITED',
  SET_EMAIL_UNCOVERED: 'SET_EMAIL_UNCOVERED',
})

export function setAlreadyVisited(alreadyVisited = false) {
  return {
    type: types.SET_ALREADY_VISITED,
    payload: {
      alreadyVisited,
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
