import {persistStore} from 'redux-persist'
import crosstabSync from 'redux-persist-crosstab'
import isServer from 'app/utils/isServer'

const whitelist = ['me']

const config = {
  whitelist
}

export default function crossTabSync(store) {
  if (!isServer) {
    crosstabSync(persistStore(store, config), config)
  }
}
