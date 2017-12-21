import importSentry from 'sentry'
import {reportSentryAvaliability, reportErrorToConsole} from './utils'

export default function report(error, additional) {
  importSentry().then(Raven => {
    const hasRaven = Raven && Raven.captureException

    reportSentryAvaliability(hasRaven)

    if (hasRaven) {
      Raven.captureException(error, additional ? additional : {})
    }

    reportErrorToConsole(Raven, hasRaven, error, additional)
  })
}
