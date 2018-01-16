import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import DemoPageLayout from './DemoPageLayout'
import Router from './Router'
import DemoPage from './DemoPage'
import css from './Library.styl'

const locationToHash = location =>
  `/${location.map(encodeURIComponent).join('/')}/`

const locationToTitle = location =>
  `${location
    .slice()
    .reverse()
    .join(' \\ ')} — Playground Library`

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
      .map(demo => ({
        title: locationToTitle(demo.location),
        hash: locationToHash(demo.location),
        content: (
          <DemoPageLayout menu={menu}>
            <DemoPage {...demo} />
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
                <span className={css.useTheMenu}>
                  Use the menu to start exploring the Playground
                </span>
              </div>
            </DemoPageLayout>
          ),
        },
      ])

    const notFoundRoute = {
      title: '404 — Playground Library',
      content: (
        <DemoPageLayout menu={menu}>
          <div className={css.emptyState}>
            Demo not found
            <br />
            <span className={css.useTheMenu}>
              Use the menu to start exploring the Playground
            </span>
          </div>
        </DemoPageLayout>
      ),
    }
    return <Router routes={routes} notFoundRoute={notFoundRoute} />
  }
}
