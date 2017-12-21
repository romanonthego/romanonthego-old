let ravenReported = false

export const reportSentryAvaliability = hasRaven => {
  if (ravenReported) {
    return
  }

  ravenReported = true

  if (hasRaven) {
    console.info('%cRaven was found, reporting errors', 'color: blue;')
  } else {
    console.info(
      '%cNO Raven was found or installed, reporting errors locally only',
      'color: blue;',
    )
  }
}

export const reportErrorToConsole = (Raven, hasRaven, error, additional) => {
  if (!GLOBALS.DEV) {
    return
  }

  const message = error.message ? `"${error.message}" ` : ' '

  console.groupCollapsed(
    `%cError ${message}reported${hasRaven ? ' to Sentry' : ' locally'} ▼`,
    'color: red; font-weight: 900;',
  )
  console.error(error)

  if (additional) {
    console.warn('With additional context: ', additional)
  }

  if (hasRaven && Raven.lastEventId) {
    console.warn('Reported to Sentry as', {eventId: Raven.lastEventId()})
  }

  console.groupEnd()
}
