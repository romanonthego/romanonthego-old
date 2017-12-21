import {
  appendAuthorization,
  prepareBody,
  getFullUrl,
  rejectOnHttpError,
  toJson,
} from './utils'

export default function client(props = {}) {
  const {
    url,
    method = 'GET',
    headers = {},
    body,
    withAuthorization = {},
    contentType = 'application/json',
    ...otherProps
  } = props

  const headersList = new Headers({
    'Content-Type': contentType,
    ...headers,
  })

  appendAuthorization(headersList, withAuthorization)

  const options = {
    ...otherProps,
    method,
    mode: 'cors',
    body: prepareBody(body, method),
    headers: headersList,
  }

  return fetch(getFullUrl(url), options)
    .then(rejectOnHttpError)
    .then(toJson)
}
