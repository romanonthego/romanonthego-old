import capitalize from 'lodash/capitalize'

export default function reactVendorPrefixes(prop, value) {
  const capitalizedProp = capitalize(prop)

  return {
    [`Webkit${capitalizedProp}`]: value,
    [`Moz${capitalizedProp}`]: value,
    [`O${capitalizedProp}`]: value,
    [`ms${capitalizedProp}`]: value,
    [prop]: value,
  }
}
