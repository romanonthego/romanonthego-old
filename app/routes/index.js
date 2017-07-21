import React from 'react'
import {Route} from 'react-router'
// pages
import IndexPage from 'app/components/Pages/IndexPage.connector'
// playground
import PlaygroundPage from 'app/components/Pages/Playground'
import TextScramble from 'app/components/Pages/Playground/TextScramble'
// errors
import NotFoundPage from 'app/components/Pages/Errors/NotFoundPage'
import ServerErrorPage from 'app/components/Pages/Errors/ServerErrorPage'
// wrapper
import Wrap from './Wrap'

export default (
  <Route component={Wrap}>
    <Route path="/" component={IndexPage} />

    <Route path="/playground" components={PlaygroundPage} />
    <Route path="/playground/text-scramble" component={TextScramble} />

    <Route path="/404" component={NotFoundPage} />
    <Route path="/500" component={() => <ServerErrorPage error={new Error('Demo error')} />} />

    <Route path="*" component={NotFoundPage} />
  </Route>
)
