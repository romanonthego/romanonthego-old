// import promiseWithTimeout from 'app/utils/promiseWithTimeout'
import {
  prepareBody,
  getFullUrl,
  rejectOnHttpError,
  toJson
} from './utils'

export default function client(props = {}) {
  const {
    url,
    method = 'GET',
    headers = {},
    body,
    // timeout = 15 * 1000,
    withAuthorization = false,
    ...otherProps,
  } = props

  const headersList = new Headers({
    'Content-Type': 'application/json',
    ...headers,
  })

  if (withAuthorization) {
    headersList.append('Authorization', withAuthorization.token)
  }

  const options = {
    ...otherProps,
    method,
    mode: 'cors',
    body: prepareBody(body, method),
    headers: headersList,
  }

  const requestPromise = fetch(getFullUrl(url), options)
    .then(rejectOnHttpError)
    .then(toJson)

  return requestPromise

  // return promiseWithTimeout(requestPromise, timeout)
}
