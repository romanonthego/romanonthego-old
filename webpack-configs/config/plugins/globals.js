import path from 'path'
import webpack from 'webpack'
import git from 'git-rev-sync'
import composeGlobals from './composeGlobals'

export const extractNodeEnv = () => {
  return JSON.stringify(process.env.NODE_ENV || 'development')
}

const extractGitSafely = cb => {
  try {
    return cb()
  } catch (e) {
    return process.env.SOURCE_VERSION || 'unable to set GIT_COMMIT'
  }
}

const extractGitCommitLong = () => extractGitSafely(() => git.long())

const extractGitCommitShort = () => extractGitSafely(() => git.short())

const extractAppVersion = () => {
  return process.env.npm_package_version
}

export const globals = {
  DEV: true,
  DEV_PRERENDER: false,
  BASE_URL: 'http://romanonthego.rocks',
  APP_ENV: 'development',
  BACKEND_URL: null,
  BACKEND_HELPER_URL: null,
  SENTRY_DSN_SERVER: null,
  SENTRY_DSN_BROWSER: null,
  RAVEN_VERSION: '3.19.1',
  TEST_ENV_VARIABLE: null,
  BACKEND_URL: 'https://ecomp-be-stage.herokuapp.com',
  VERSION: extractAppVersion(),
  GIT_COMMIT_LONG: extractGitCommitLong(),
  GIT_COMMIT_SHORT: extractGitCommitShort(),
  RESUME_LINK: null,
}

export default (config = {}) => {
  const {__DIR} = config

  const composedGlobals = {
    // node.js fixtures
    __dirname: JSON.stringify(__DIR),
    __filename: JSON.stringify(path.join(__DIR, 'index.js')),
    // prevent warning in production mode and stuff.
    // second one is kinda hacky, but _sometimes_ needed as a string
    // god knows why
    NODE_ENV: extractNodeEnv(),
    'process.env.NODE_ENV': extractNodeEnv(),
    // globals
    GLOBALS: composeGlobals(globals),
  }

  return new webpack.DefinePlugin(composedGlobals)
}
