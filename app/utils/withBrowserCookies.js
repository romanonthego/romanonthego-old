import cookies from 'cookies-js'
import window from 'app/utils/window'

export default function withBrowserCookies(callback) {
  if (window.document) {
    callback(cookies)
  }
}
