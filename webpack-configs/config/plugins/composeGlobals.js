import snakeCase from 'lodash/snakeCase'
import map from 'lodash/map'

function globalizeName(name) {
  return snakeCase(name).toUpperCase()
}

function getValue(name, defaultValue) {
  const envValue = process.env[name]

  return typeof envValue === 'undefined' ? defaultValue : envValue
}

function getNameAndValue(defaultValue = null, name = '') {
  const globalizedName = globalizeName(name)
  const value = getValue(globalizedName, defaultValue)

  return [`${globalizedName}`, JSON.stringify(value)]
}

// will compose globals like {VARIABLE: JSON.stringify(process.env.romanonthego.rocks || 'default')}
// globals itself expected to be provide with heroku settings
// or .dev file with foreman runner
export default function composeGlobals(globals = {}) {
  const result = {}

  map(globals, (defaultValue, name) => {
    const [globalizedName, value] = getNameAndValue(defaultValue, name)

    result[globalizedName] = value
  })

  return result
}
