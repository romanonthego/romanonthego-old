import {persistStore} from 'redux-persist'
// import {createFilter} from 'redux-persist-transform-filter'
import CookieStorage from './cookiesPersistStorage'
import crossTabSync from './utils/crossTabSync'

const daysToPersist = 7
const defaultExpiration = daysToPersist * 86400

const config = {
  keyPrefix: 'romanonthego.rocks',
  whitelist: [],
}

export default function storePersist(store, cookies) {
  return new Promise((resolve, reject) => {
    try {
      const storage = new CookieStorage({
        cookies,
        expiration: {
          default: defaultExpiration, // Cookies expire after one week
        },
      })

      // rehydration callback and promise resolver
      const onPersist = (error, result) => {
        // console.log(error, result)
        if (error) {
          reject(error)
          return
        }

        resolve(result)
      }

      persistStore(
        store,
        {
          storage,
          ...config,
        },
        onPersist,
      )

      crossTabSync(store)
    } catch (error) {
      reject(error)
    }
  })
}
