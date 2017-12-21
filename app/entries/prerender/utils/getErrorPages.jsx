import NotFoundPage from 'app/components/Pages/Errors/NotFoundPage'
import ServerErrorPage from 'app/components/Pages/Errors/ServerErrorPage'
import wrapErrorPage from './wrapErrorPage'

export default function getErrorPages(statics, store) {
  const wrap = Component => wrapErrorPage(Component, statics, store)

  return {
    serverErrorPage: wrap(ServerErrorPage),
    notFoundPage: wrap(NotFoundPage),
  }
}

export function getDumbServerErrorPage(statics) {
  return wrapErrorPage(ServerErrorPage, statics)
}
