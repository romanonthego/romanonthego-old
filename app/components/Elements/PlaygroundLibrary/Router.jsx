import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'app/components/Helmet'

export default class Router extends PureComponent {
  static propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    notFoundRoute: PropTypes.object.isRequired,
  }

  getCurrentRoute = () => {
    const {routes, notFoundRoute} = this.props
    const hash = location.hash.slice(2)

    const route = routes.find(route => route.hash === hash)

    if (route) {
      return route
    }

    return notFoundRoute
  }

  handleHashChange = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange)
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange)
  }

  render() {
    const {content, hash, title} = this.getCurrentRoute()

    return (
      <React.Fragment>
        <Helmet title={title} />
        {React.cloneElement(content, {currentHash: hash})}
      </React.Fragment>
    )
  }
}
