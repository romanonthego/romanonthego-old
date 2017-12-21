import React from 'react'
import isArray from 'lodash/isArray'
import NotFoundPage from 'app/components/Pages/Errors/NotFoundPage'
import UnauthorizedPage from 'app/components/Pages/Errors/UnauthorizedPage'
import ServerErrorPage from 'app/components/Pages/Errors/ServerErrorPage'

const errorPages = {
  403: UnauthorizedPage,
  404: NotFoundPage,
  416: NotFoundPage, // yep, wrong pagination for now gets and 404 page
  500: ServerErrorPage,
}

function getFinalError(errors) {
  if (!isArray(errors)) {
    throw new Error(`expected errors to be an array, ${errors} were given`)
  }

  if (errors.length === 0) {
    return 500
  }

  if (errors.length === 1) {
    return errors[0]
  }

  return errors.reduce((acc, err) => {
    if (err > acc) {
      return err
    }

    return acc
  }, 400)
}

export default function defaultErrorComponent(
  errors = [500],
  props = {},
  skipLayout = false,
) {
  const errorCode = getFinalError(errors)
  const ErrorPage = errorPages[errorCode] || ServerErrorPage

  return <ErrorPage {...props} skipLayout={skipLayout} />
}
