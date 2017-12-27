export default function typesWithPrefix(prefix = '', types = {}) {
  return Object.keys(types).reduce((result, key) => {
    result[key] = `${prefix}/${types[key]}`

    return result
  }, {})
}
