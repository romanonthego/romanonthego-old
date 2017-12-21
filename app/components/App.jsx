import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import AppRouter from 'app/routes'
import reportError from 'app/utils/reporting'

export default class App extends PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    hasError: false,
  }

  componentDidCatch(error, info) {
    // Display fallback UI and reporting error
    this.setState({hasError: true}, () => {
      reportError(error, {extra: {info, message: 'runtime react error'}})
    })
  }

  render() {
    const {store, history} = this.props
    const {hasError} = this.state

    if (hasError) {
      return <div>Runtime react error</div>
    }

    return (
      <Provider store={store}>
        <AppRouter history={history} />
      </Provider>
    )
  }
}
