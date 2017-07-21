import 'babel-polyfill'
import 'isomorphic-fetch'
import 'app/styles/app.styl'
import ReactDOM from 'react-dom'
import React from 'react'
import {Provider} from 'react-redux'
import Library from 'react-demo-library'
import createStore from 'app/demo/createStore'
import demos from 'app/demo/paths'
import importCore from './utils/importCore'


importCore().then(() => {
  const demo = (
    <Provider store={createStore()} key="provider">
      <Library demos={demos} />
    </Provider>
  )

  ReactDOM.render(demo, document.getElementById('demo'))
})
