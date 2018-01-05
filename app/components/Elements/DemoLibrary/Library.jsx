import React, {PureComponent} from 'react'
import T from 'prop-types'
import Layout from './Layout'
import Router from './Router'
import DemoPage from './DemoPage'
import css from './Library.styl'

function locationToHash(location) {
  return `/${location.map(encodeURIComponent).join('/')}/`
}

function locationToTitle(location) {
  return `${location
    .slice()
    .reverse()
    .join(' \\ ')} — Components Library`
}

export default class Library extends PureComponent {
  static propTypes = {
    demos: T.arrayOf(T.object.isRequired).isRequired,
  }

  render() {
    const {demos} = this.props
    const menu = demos.map(({location}) => ({
      location,
      hash: locationToHash(location),
    }))
    const routes = demos
      .map(spec => ({
        title: locationToTitle(spec.location),
        hash: locationToHash(spec.location),
        content: (
          <Layout menu={menu} fullWidth={spec.fullWidth}>
            <DemoPage {...spec} />
          </Layout>
        ),
      }))
      .concat([
        {
          title: 'Playground',
          hash: '',
          content: (
            <Layout menu={menu}>
              <div className={css.emptyState}>
                {'<=='} Use menu to start exploring the Playground
              </div>
            </Layout>
          ),
        },
      ])
    const notFoundRoute = {
      title: '404 — Components Library',
      content: <Layout menu={menu}>404</Layout>,
    }
    return <Router routes={routes} notFoundRoute={notFoundRoute} />
  }
}