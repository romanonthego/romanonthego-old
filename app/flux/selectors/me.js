import {createSelector} from 'reselect'

const selectMe = state => state.me

export const selectAlreadyVisited = createSelector(
  selectMe,
  me => me.alreadyVisited,
)

export const selectEmailUncovered = createSelector(
  selectMe,
  me => me.emailUncovered,
)
