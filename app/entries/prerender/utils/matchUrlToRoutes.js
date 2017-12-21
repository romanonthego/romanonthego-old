import {match} from 'react-router/es'

export default function matchUrlToRoutes({routes, location}) {
  return new Promise((resolve, reject) => {
    match({routes, location}, (error, redirect, renderProps) => {
      if (error) {
        reject({status: 500, error})
        return
      }

      if (redirect) {
        reject({status: 304, url: redirect.pathname + redirect.search})
        return
      }

      if (!renderProps) {
        reject({status: 404})
        return
      }

      resolve(renderProps)
    })
  })
}
