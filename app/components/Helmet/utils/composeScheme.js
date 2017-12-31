import compose from './compose'

export default function composeScheme(type, schemaObj = {}) {
  return compose(type, schemaObj)
}
