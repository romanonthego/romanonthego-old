import Raven from 'raven'

export default function setupSentry() {
  if (GLOBALS.SENTRY_DSN_SERVER) {
    Raven.config(GLOBALS.SENTRY_DSN_SERVER, {
      captureUnhandledRejections: true,
      environment: GLOBALS.APP_ENV,
      debug: GLOBALS.DEV,
      release: GLOBALS.VERSION,
      tags: {
        git_commit: GLOBALS.GIT_COMMIT,
        entry: 'server',
      },
      extra: {
        GLOBALS,
      },
      allowSecretKey: true,
    }).install()
  }
}
