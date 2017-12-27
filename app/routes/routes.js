import React from 'react'
import Wrap from './Wrap'
import {Route} from 'react-router'
// pages
import IndexPage from 'app/components/Pages/IndexPage'
import ResumePage from 'app/components/Pages/Resume'
import PlaygroundPage from 'app/components/Pages/Playground'
import TextScramblePage from 'app/components/Pages/Playground/TextScramble'
import TextPrintPage from 'app/components/Pages/Playground/TextPrint'
// errors
import NotFoundPage from 'app/components/Pages/Errors/NotFoundPage'
import ServerErrorPage from 'app/components/Pages/Errors/ServerErrorPage'

export default (
  <Route component={Wrap}>
    <Route path="/" exact component={IndexPage} />
    <Route path="/resume" component={ResumePage} />
    <Route path="/playground" component={PlaygroundPage} />
    <Route path="/playground/text-scramble" component={TextScramblePage} />
    <Route path="/playground/text-print" component={TextPrintPage} />
    <Route path="/404" exact component={NotFoundPage} />
    <Route
      path="/500"
      exact
      component={() => <ServerErrorPage error={new Error('demo error')} />}
    />
    <Route path="*" component={NotFoundPage} />
  </Route>
)
