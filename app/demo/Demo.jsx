import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import Library from 'react-demo-library'
import createStore from 'app/demo/createStore'
import demos from 'app/demo/paths'

export default class Demo extends PureComponent {
  render() {
    return (
      <Provider store={createStore()} key="provider">
        <Library demos={demos} />
      </Provider>
    )
  }
}
