import isEqual from 'shallowequal'
import {trackPage} from 'app/utils/analytics/gaAction'

function getParamsFromHistory(history) {
  const {pathname, hash} = history.getCurrentLocation()

  return {pathname, hash}
}

export default function attachHistoryListeners(history) {
  let beforeTransitionParams = {}
  let afterTransitionParams = {}

  const shouldScrollToTop = () =>
    !isEqual(beforeTransitionParams, afterTransitionParams)

  history.listenBefore(() => {
    const {pathname, pageNumber} = getParamsFromHistory(history)

    beforeTransitionParams = {pathname, pageNumber}
  })

  history.listen(() => {
    const {pathname, hash} = history.getCurrentLocation()

    afterTransitionParams = {pathname, hash}

    trackPage(`${pathname}${hash}`)

    if (shouldScrollToTop()) {
      window.scrollTo(0, 0)
    }
  })
}
