import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Router} from 'react-router'
import {ReduxAsyncConnect} from 'redux-connect'
import helpers from 'app/flux/utils/asyncConnectHelpers'
import routes from './routes'

const asyncConnectRenderer = props => (
  <ReduxAsyncConnect {...props} helpers={helpers} />
)

export default class AppRouter extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  render() {
    const {history} = this.props

    return (
      <Router render={asyncConnectRenderer} history={history} routes={routes} />
    )
  }
}
