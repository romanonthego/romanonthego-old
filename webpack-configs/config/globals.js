import git from 'git-rev-sync'
// import thisPackage from '../../package.json'

export default {
  DEV: true,
  DEV_PRERENDER: false,
  BASE_URL: 'http://romanonthego.rocks',
  GA: false,
  GA_MODE: 'auto',
  LAST_COMMIT_LONG: git.long(),
  LAST_COMMIT_SHORT: git.short(),
  VERSION: '2.0',  // IMPORTANT
  // TO ACCESS THIS METADATA RUN
  // heroku labs:enable runtime-dyno-metadata -a <app name>
  // HEROKU_APP_ID: false,
  // HEROKU_APP_NAME: false,
  // HEROKU_DYNO_ID: false,
  // HEROKU_RELEASE_CREATED_AT: false,
  // HEROKU_RELEASE_VERSION: false,
  // HEROKU_SLUG_COMMIT: false,
  // HEROKU_SLUG_DESCRIPTION: false,
}
