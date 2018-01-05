import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {asyncConnect} from 'redux-connect'
import omit from 'lodash/omit'
import PageMeta from 'app/components/PageMeta'
import {isClient} from 'app/utils/isServer'
import ControlPanel from 'app/components/Layout/ControlPanel'
import Helmet from 'app/components/Helmet'
import RouteTransition from 'app/routes/RouteTransition'
import css from './index.styl'

const propsToOmit = [
  'history',
  'location',
  'params',
  'route',
  'router',
  'empty',
  'routeParams',
  'routes',
  'dispatch',
]

const sanitizeProps = props => omit(props, propsToOmit)

export class Wrap extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const {location: {pathname, search}} = this.props

    const url = pathname + search

    return (
      <PageMeta status={200} lang="en">
        <main className={css.wrap}>
          <Helmet
            website={{
              name: 'romanonthego',
              alternateName: 'romanonthego.rocks',
              url: 'http://romanonthego.rocks',
            }}
          />
          <ControlPanel />
          <RouteTransition url={url} animated={isClient}>
            <main className={css.wrappedRoute} {...sanitizeProps(this.props)} />
          </RouteTransition>
        </main>
      </PageMeta>
    )
  }
}

const asyncLoaders = []
const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({})

export default asyncConnect(asyncLoaders, mapStateToProps, mapDispatchToProps)(
  Wrap,
)
