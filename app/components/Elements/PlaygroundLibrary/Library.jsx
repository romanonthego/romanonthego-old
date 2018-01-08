import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import DemoPageLayout from './DemoPageLayout'
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
    demos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
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
          <DemoPageLayout menu={menu} fullWidth={spec.fullWidth}>
            <DemoPage {...spec} />
          </DemoPageLayout>
        ),
      }))
      .concat([
        {
          title: 'Playground',
          hash: '',
          content: (
            <DemoPageLayout menu={menu}>
              <div className={css.emptyState}>
                {'<=='} Use the menu to start exploring the Playground
              </div>
            </DemoPageLayout>
          ),
        },
      ])
    const notFoundRoute = {
      title: '404 — Components Library',
      content: (
        <DemoPageLayout menu={menu}>
          <div className={css.emptyState}>
            Demo not found
            <br />
            {'<=='} Use the menu
          </div>
        </DemoPageLayout>
      ),
    }
    return <Router routes={routes} notFoundRoute={notFoundRoute} />
  }
}
