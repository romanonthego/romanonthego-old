import {persistStore} from 'redux-persist'
import CookieStorage from './cookiesPersistStorage'
import crossTabSync from './utils/crossTabSync'
import errorTrimmer from './middlewares/errorTrimmer'

const dayInMS = 86400
const daysToPersist = 7
const defaultExpiration = daysToPersist * dayInMS

const config = {
  keyPrefix: '',
  whitelist: [
    // 'cart',
    'currency',
    'account',
    'tempOrder',
  ]
}

export default function storePersist(store, cookies) {
  return new Promise((resolve, reject) => {
    try {
      const storage = new CookieStorage({
        cookies,
        expiration: {
          default: defaultExpiration // Cookies expire after one week
        },
      })

      // rehydration callback and promise resolver
      const onPersist = (error, result) => {
        if (error) {
          reject(error)
          return
        }

        resolve(result)
      }

      persistStore(store, {
        storage,
        ...config,
        transforms: [errorTrimmer],
      }, onPersist)

      crossTabSync(store)
    } catch (error) {
      reject(error)
    }
  })
}
