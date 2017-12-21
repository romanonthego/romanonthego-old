import path from 'path'
import 'colors'

const validAppEnvs = ['development', 'staging', 'production']
let APP_ENV = process.env.APP_ENV

if (!APP_ENV) {
  console.log(
    'The APP_ENV environment variable is required but was not specified.'
      .yellow,
    '"development" will be used as default'.yellow,
  )

  APP_ENV = 'development'
}

if (!validAppEnvs.includes(APP_ENV)) {
  console.log(
    `The APP_ENV environment variable is invalid.`.yellow,
    `One of${JSON.stringify(validAppEnvs)} required`.yellow,
    '"development" will be used as default'.yellow,
  )

  APP_ENV = 'development'
}

export default function getEnvVariables(__DIR) {
  const dotenvFiles = [
    path.join(__DIR, `.env.${APP_ENV}`),
    path.join(__DIR, '.env'),
  ]

  dotenvFiles.forEach(dotenvFile => {
    require('dotenv').config({path: dotenvFile})
  })
}
