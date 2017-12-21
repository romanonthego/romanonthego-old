import 'isomorphic-fetch'
import 'app/styles/app.styl'
import {render} from 'react-dom'
import React from 'react'
import {AppContainer} from 'react-hot-loader'
import Demo from 'app/demo/Demo'

const renderDemo = DemoComponent =>
  render(
    <AppContainer>
      <DemoComponent />
    </AppContainer>,
    document.getElementById('demo'),
  )

renderDemo(Demo)

if (module.hot) {
  module.hot.accept('app/demo/Demo', () => {
    const NewDemoComponent = require('app/demo/Demo')
    renderDemo(NewDemoComponent)
  })
}
