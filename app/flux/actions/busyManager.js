const prefix = '@busyManager'

export const types = {
  MAKE_BUSY: `${prefix}/MAKE_BUSY`,
  MAKE_FREE: `${prefix}/MAKE_FREE`,
  RESET: `${prefix}/RESET`,
}

export function makeBusy(key) {
  return {
    type: types.MAKE_BUSY,
    payload: {
      key,
    }
  }
}

export function makeFree() {
  return {
    type: types.MAKE_FREE,
  }
}


export function reset() {
  return {
    type: types.RESET,
  }
}
