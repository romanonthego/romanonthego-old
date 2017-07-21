import get from 'lodash/get'

export function selectFastMode(state) {
  return get(state, 'me.fastMode', false)
}

export function selectEmailUncovered(state) {
  return get(state, 'me.emailUncovered', false)
}
