import {createSelector} from 'reselect'

const selectLoadingBar = state => state.loadingBar

export const selectIsLoadingBarShown = createSelector(
  selectLoadingBar,
  loadingBar => loadingBar.shown,
)

export const selectIsLoadingBarWithError = createSelector(
  selectLoadingBar,
  loadingBar => loadingBar.error,
)
