import {createSelector} from 'reselect'

const selectRouting = state => state.routing

export const selectLocationBeforeTransition = createSelector(
  selectRouting,
  routing => routing.locationBeforeTransitions,
)

export const selectPathname = createSelector(
  selectLocationBeforeTransition,
  ({pathname}) => pathname,
)

export const selectQuery = createSelector(
  selectLocationBeforeTransition,
  ({query}) => query,
)

export const selectUrl = createSelector(
  selectLocationBeforeTransition,
  ({pathname, search}) => pathname + search,
)
