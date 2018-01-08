import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default class Router extends PureComponent {
  static propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    notFoundRoute: PropTypes.object.isRequired,
  }

  getCurrentRoute = () => {
    const {routes, notFoundRoute} = this.props

    const hash = location.hash.slice(2) // removes #!

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i]

      if (route.hash === hash) {
        return route
      }
    }

    return notFoundRoute
  }

  handleHashChange = () => {
    this.forceUpdate(() => {
      window.scrollTo(0, 0)
    })
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange)
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange)
  }

  render() {
    const route = this.getCurrentRoute()

    // don't do that at work
    document.title = route.title

    // this is even dirtier, we know that `route.content` always a <Layout>
    // element, so we just push additional prop to it. Tight coupling FTW.
    return React.cloneElement(route.content, {currentHash: route.hash})
  }
}
