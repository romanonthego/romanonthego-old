import React from 'react'
import Wrap from './Wrap'
import {Route} from 'react-router'
// pages
import IndexPage from 'app/components/Pages/IndexPage'
// errors
import NotFoundPage from 'app/components/Pages/Errors/NotFoundPage'
import UnauthorizedPage from 'app/components/Pages/Errors/UnauthorizedPage'
import ServerErrorPage from 'app/components/Pages/Errors/ServerErrorPage'

export default (
  <Route component={Wrap}>
    <Route path="/" exact component={IndexPage} />
    <Route path="/404" exact component={NotFoundPage} />
    <Route path="/403" exact component={UnauthorizedPage} />
    <Route
      path="/500"
      exact
      component={() => <ServerErrorPage error={new Error('demo error')} />}
    />
  </Route>
)
