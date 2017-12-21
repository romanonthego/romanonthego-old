import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {asyncConnect} from 'redux-connect'
import omit from 'lodash/omit'
import PageMeta from 'app/components/PageMeta'
import {isClient} from 'app/utils/isServer'
import LoadingBar from 'app/components/Layout/LoadingBar'
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
      <PageMeta status={200} lang="ru">
        <main className={css.wrap}>
          <Helmet />
          <LoadingBar />
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
