import isPlainObject from 'lodash/isPlainObject'

export const is = (o, type) => toString.call(o) === `[object ${type}]`
export const isFormData = (o) => is(o, 'FormData')
export const isURLSearchParams = (o) => is(o, 'URLSearchParams')
export const isBlob = (o) => is(o, 'Blob')

export function isValidBody(body) {
  return typeof body === 'string' ||
    isFormData(body) ||
    isURLSearchParams(body) ||
    isBlob(body)
}

export function getFullUrl(url) {
  return encodeURI(`${GLOBALS.BACKEND_URL}/api/${url}`)
}

export const methodsWithBodyAllowed = [
  'POST',
  'PUT',
]

export function prepareBody(body, method = 'GET') {
  if (!methodsWithBodyAllowed.includes(method)) {
    return undefined
  }

  if (isValidBody(body)) {
    return body
  }

  if (isPlainObject(body)) {
    return JSON.stringify(body)
  }

  return undefined
}

export const rejectOnHttpError = (resp) => {
  if (resp.ok) {
    return resp
  }

  return Promise.reject({
    status: resp.status,
    message: resp.message
  })
}

export const toJson = (resp) => {
  return resp
    .json()
    .catch((error) => {
      return Promise.reject({
        status: 500, // emulation 500 error with json parsing
        message: 'Could not parse JSON in server response',
      })
    })
}
