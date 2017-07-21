const prefix = '@loadingBar'
export const types = {
  SHOW: `${prefix}/SHOW`,
  HIDE: `${prefix}/HIDE`,
  HIDE_WITH_ERROR: `${prefix}/HIDE_WITH_ERROR`,
  RESET: `${prefix}/RESET`,
}

export function showLoadingBar() {
  return {
    type: types.SHOW,
  }
}

export function hideLoadingBar() {
  return {
    type: types.HIDE,
  }
}

export function hideLoadingBarWithError() {
  return {
    type: types.HIDE_WITH_ERROR,
  }
}

export function resetLoadingBar() {
  return {
    type: types.RESET,
  }
}
