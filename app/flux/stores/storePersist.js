import {persistStore} from 'redux-persist'
import CookieStorage from './cookiesPersistStorage'
import crossTabSync from './utils/crossTabSync'

const dayInMS = 86400
const daysToPersist = 7
const defaultExpiration = daysToPersist * dayInMS

const config = {
  keyPrefix: '',
  whitelist: ['me']
}

// rehydration callback and promise resolver
const onPersist = (resolve, reject) => (error, result) => {
  if (error) {
    return reject(error)
  }

  return resolve(result)
}

const createPersistStore = (store, cookies, resolve, reject) => {
  const storage = new CookieStorage({
    cookies,
    expiration: {
      default: defaultExpiration // Cookies expire after one week
    },
  })

  persistStore(store, {...config, storage}, onPersist(resolve, reject))
  crossTabSync(store)
}

export default function storePersist(store, cookies) {
  return new Promise((resolve, reject) => {
    try {
      createPersistStore(store, cookies, resolve, reject)
    } catch (error) {
      reject(error)
    }
  })
}
