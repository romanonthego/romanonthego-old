import 'colors'

export default function startMessage(type, port) {
  const globals = Object.keys(GLOBALS)
    .map((key) => `${key} = ${GLOBALS[key]}`)
    .join('\n')

  const message = `App ${type} server listening on ${port} with:\n${globals}`.green

  console.log(message) // eslint-disable-line
}
