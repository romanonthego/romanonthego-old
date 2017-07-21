export default class FakeCookieJar {
  constructor(cookies) {
    const parsed = {}

    Object.keys(cookies).forEach((key) => {
      parsed[unescape(key)] = cookies[key]
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

