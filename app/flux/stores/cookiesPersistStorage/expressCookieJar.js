export default class ExpressCookieJar {
  constructor(cookies) {
    const parsed = {}

    Object.keys(cookies).forEach(key => {
      parsed[decodeURIComponent(key)] = decodeURIComponent(cookies[key])
    })

    this.cookies = parsed
  }

  get(key) {
    return this.cookies[key]
  }

  set(key, value) {
    this.cookies[key] = value
  }

  expire(key) {
    delete this.cookies[key]
  }
}
