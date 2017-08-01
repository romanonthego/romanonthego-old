import React from 'react'
import {Route} from 'react-router'
// pages
import IndexPage from 'app/components/Pages/IndexPage/index.connector'
// playground
import PlaygroundPage from 'app/components/Pages/Playground'
import TextScramble from 'app/components/Pages/Playground/TextScramble'
// errors
import NotFoundPage from 'app/components/Pages/Errors/NotFoundPage'
import ServerErrorPage from 'app/components/Pages/Errors/ServerErrorPage'
// wrapper
import Wrap from './Wrap'

// just to test out how errors are rendered
function DemoError() {
  return (
    <ServerErrorPage error={new Error('Demo error')} />
  )
}

export default (
  <Route component={Wrap}>
    <Route path="/" component={IndexPage} />

    <Route path="/playground" components={PlaygroundPage} />
    <Route path="/playground/text-scramble" component={TextScramble} />

    <Route path="/404" component={NotFoundPage} />
    <Route path="/500" component={DemoError} />

    <Route path="*" component={NotFoundPage} />
  </Route>
)
