import 'colors'
import reportError from 'app/utils/reporting'

const formatMessage = (type, port, globals) =>
  `
=============================================
App ${type} server listening on ${port} with:
${globals}
=============================================
`.green

export default function startMessage(type, port) {
  // console.log(GLOBALS)

  const globals = JSON.stringify(GLOBALS, null, 2)
  const message = formatMessage(type, port, globals)

  return error => {
    if (error) {
      errorMessage(error)
    }

    setTimeout(() => {
      console.log(message)
    }, 1000)
  }
}

export const errorMessage = (type = 'development', port = 8080) => {
  return error => {
    reportError(error, {
      extra: {
        message: `${type} server failed to start on ${port}`,
      },
    })
  }
}
