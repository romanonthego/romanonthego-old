import {createSelector} from 'reselect'

const selectMe = state => state.me

export const selectFastMode = createSelector(selectMe, me => me.fastMode)
export const selectEmailUncovered = createSelector(
  selectMe,
  me => me.emailUncovered,
)
