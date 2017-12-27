import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import AppRouter from 'app/routes'
import ServerErrorPage from 'app/components/Pages/Errors/ServerErrorPage'
import reportError from 'app/utils/reporting'

export default class App extends PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.shape({
      listen: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    error: null,
  }

  componentDidMount() {
    this.props.history.listen(this.removeRuntimeError)
  }

  componentDidCatch(error, info) {
    // Display fallback UI and reporting error
    this.setState({error}, () => {
      reportError(error, {extra: {info, message: 'runtime react error'}})
    })
  }

  removeRuntimeError = () => {
    this.setState({error: null})
  }

  render() {
    const {store, history} = this.props
    const {error} = this.state

    if (error) {
      return <ServerErrorPage error={error} />
    }

    return (
      <Provider store={store}>
        <AppRouter history={history} />
      </Provider>
    )
  }
}
