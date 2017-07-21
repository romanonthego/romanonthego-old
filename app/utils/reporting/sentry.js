import log, {warn} from './log'

export default function report(err) {
  Raven.captureException(err, (sendError, eventId) => {
    if (sendError) {
      warn('Failed to send captured exception to Sentry', eventId)
    }

    log('Captured exception and send to Sentry successfully')
  })
}
