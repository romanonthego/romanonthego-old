import {persistStore} from 'redux-persist'
// import {createFilter} from 'redux-persist-transform-filter'
import crosstabSync from 'redux-persist-crosstab'
import {isClient} from 'app/utils/isServer'

const whitelist = ['me']

export default function crossTabSync(store) {
  if (isClient) {
    crosstabSync(
      persistStore(store, {
        whitelist,
      }),
      {whitelist},
    )
  }
}
