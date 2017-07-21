import snakeCase from 'lodash/snakeCase'
import map from 'lodash/map'

function globalizeName(defaultValue = null, name = '') {
  const globalizedName = snakeCase(name).toUpperCase()

  const envValue = process.env[globalizedName]

  const value = envValue === undefined ? defaultValue : envValue

  return [
    `${globalizedName}`,
    JSON.stringify(value),
  ]
}

// will compose globals like {__NAME__: JSON.stringify(process.env.NAME || 'default')}
// globals itself expected to be provide with heroku settings
// or .dev file with foreman runner
export default function composeGlobals(globals) {
  const result = {}

  map(globals, (defaultValue, name) => {
    const [globalizedName, value] = globalizeName(defaultValue, name)

    result[globalizedName] = value
  })

  return result
}

