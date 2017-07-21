function consoleMethod(method, ...args) {
  if (GLOBALS.DEBUG) {
    console[method](...args) // eslint-disable-line
  }
}

export default function log(...args) {
  consoleMethod('log', ...args)
}

export function warn(...args) {
  consoleMethod('warn', ...args)
}

