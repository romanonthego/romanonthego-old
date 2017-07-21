import isEqual from 'shallowequal'
import {trackPage} from 'app/utils/analytics/gaAction'

function getParamsFromHistory(history) {
  const {
    pathname,
    search,
    query: {
      page: pageNumber,
    } = {}
  } = history.getCurrentLocation()

  return {pathname, search, pageNumber}
}

export default function attachHistoryListeners(history) {
  let beforeTransitionParams = {}
  let afterTransitionParams = {}

  const shouldScrollToTop = () => !isEqual(beforeTransitionParams, afterTransitionParams)

  history.listenBefore(() => {
    const {
      pathname,
      pageNumber
    } = getParamsFromHistory(history)

    beforeTransitionParams = {pathname, pageNumber}
  })

  history.listen(() => {
    const {
      pathname,
      search,
      pageNumber
    } = history.getCurrentLocation()

    afterTransitionParams = {pathname, pageNumber}

    trackPage(`${pathname}${search}`)

    if (shouldScrollToTop()) {
      window.scrollTo(0, 0)
    }
  })
}
