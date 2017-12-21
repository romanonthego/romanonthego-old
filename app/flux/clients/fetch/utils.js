import isPlainObject from 'lodash/isPlainObject'
import upperFirst from 'lodash/upperFirst'
import startCase from 'lodash/startCase'
import replace from 'lodash/replace'

export const is = (o, type) => toString.call(o) === `[object ${type}]`
export const isFormData = o => is(o, 'FormData')
export const isURLSearchParams = o => is(o, 'URLSearchParams')
export const isBlob = o => is(o, 'Blob')

export function authorizationHeader(type, value) {
  const typeReady = replace(upperFirst(startCase(type)), ' ', '')
  // headers cannot contain non ascii characters? 0-0
  const valueReady = value.replace(/[^\x00-\x7F]/g, '')

  return `${typeReady} ${valueReady}`
}

export function appendAuthorization(headers, authorization) {
  const authHeader = Object.keys(authorization)
    .map(key => authorizationHeader(key, authorization[key]))
    .join(', ')

  if (authHeader.length) {
    headers.append('Authorization', authHeader)
  }

  return headers
}

export function isValidBody(body) {
  return (
    typeof body === 'string' ||
    isFormData(body) ||
    isURLSearchParams(body) ||
    isBlob(body)
  )
}

export function getFullUrl(url, server = GLOBALS.BACKEND_URL) {
  return encodeURI(`${server}/api/${url}`)
}

export const methodsWithBodyAllowed = ['POST', 'PUT']

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

export const rejectOnHttpError = resp => {
  if (resp.ok) {
    return resp
  }

  return resp.json().then(parsed => {
    return Promise.reject(parsed)
  })
}

export const toJson = resp => {
  return resp.json().catch(error => {
    return Promise.reject({
      status: 500, // emulation 500 error with json parsing
      message: 'Could not parse JSON in server response',
    })
  })
}
