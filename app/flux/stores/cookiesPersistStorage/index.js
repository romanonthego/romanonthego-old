import Cookies from 'cookies-js'
import FakeCookieJar from './fakeCookieJar'
import ExpressCookieJar from './expressCookieJar'

const dayInMS = 86400
const daysToPersist = 1
const defaultExpiration = daysToPersist * dayInMS

export default class CookieStorage {
  constructor(options = {}) {
    const {
      keyPrefix = '',
      indexKey = 'reduxPersisIndex',
      expiration = {},
      windowRef,
      cookies,
    } = options

    this.keyPrefix = keyPrefix
    this.indexKey = indexKey
    this.expiration = {
      default: defaultExpiration,
      ...expiration
    }

    if (windowRef || typeof window !== 'undefined') {
      this.cookies = windowRef ? Cookies(windowRef) : Cookies
      return
    }

    if (cookies) {
      this.cookies = new ExpressCookieJar(cookies)
      return
    }

    this.cookies = new FakeCookieJar(cookies)
  }

  getItem(key, callback) {
    const cookie = this.cookies.get(this.keyPrefix + key) || null
    try {
      callback(null, decodeURIComponent(cookie))
    } catch (error) {
      callback(error)
    }

  }

  setItem(key, value, callback) {
    const options = {}
    let expires = this.expiration.default

    if (typeof this.expiration[key] !== 'undefined') {
      expires = this.expiration[key]
    }
    if (expires) {
      options.expires = expires
    }

    this.cookies.set(this.keyPrefix + key, value, options)
    this.updateKeyIndex(key, callback)
  }

  updateKeyIndex(key, callback) {
    const options = {}

    // if (this.expiration.default) {
    //   options.expires = this.expiration.default
    // }

    this.getAllKeys((error, allKeys) => {
      if (allKeys.indexOf(key) === -1) {
        allKeys.push(key)
        this.cookies.set(this.indexKey, JSON.stringify(allKeys), options)
      }
      callback(null)
    })
  }

  removeItem(key, callback) {
    this.cookies.expire(this.keyPrefix + key)

    this.getAllKeys((error, allKeys) => {
      const allKeysFiltered = allKeys.filter((k) => {
        return k !== key
      })

      this.cookies.set(this.indexKey, JSON.stringify(allKeysFiltered))
      callback(null)
    })
  }

  getAllKeys(callback) {
    const cookie = this.cookies.get(this.indexKey)

    let result = []

    try {
      if (cookie) {
        result = JSON.parse(decodeURIComponent(cookie))
      }

      callback(null, result)
    } catch (error) {
      callback(error)
    }
  }
}
