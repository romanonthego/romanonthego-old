import {persistStore} from 'redux-persist'
import crosstabSync from 'redux-persist-crosstab'
import isServer from 'app/utils/isServer'

export default function crossTabSync(store) {
  if (!isServer) {
    crosstabSync(persistStore(store, {
      whitelist: ['cart']
    }), {
      whitelist: ['cart']
    })
  }
}
