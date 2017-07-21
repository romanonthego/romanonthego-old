import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import {ReduxAsyncConnect} from 'redux-connect'

import helpers from 'app/flux/utils/asyncConnectHelpers'

import routes from 'app/routes'

export default class App extends PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  render() {
    const {
      store,
      history,
    } = this.props

    const routerRender = (props) => (
      <ReduxAsyncConnect
        {...props}
      />
    )

    return (
      <Provider store={store}>
        <Router
          render={routerRender}
          helpers={helpers}
          history={history}
        >
          {routes}
        </Router>
      </Provider>
    )
  }
}
