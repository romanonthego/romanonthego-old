import {asyncConnect} from 'redux-connect'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import getComponentName from 'app/utils/getComponentName'
import defaultErrorComponent from './getErrorComponent'

const noErrors = () => null

export default function pageRenderingProvider(PageComponent, props = {}) {
  const {
    asyncLoaders = [],
    mapStateToProps = () => ({}),
    mapDispatchToProps = () => ({}),
    getErrorComponent = defaultErrorComponent,
    getErrors = noErrors,
    skipLayout = false,
  } = props

  const mapStateToPropsWithErrors = (state, ownProps) => {
    return {
      ...mapStateToProps(state, ownProps),
      errors: getErrors(state, ownProps),
    }
  }

  return @asyncConnect(
    asyncLoaders,
    mapStateToPropsWithErrors,
    mapDispatchToProps,
  )
  class PageRenderingProvider extends PureComponent {
    static displayName = `PageRenderingProvider(${getComponentName(PageComponent)})`

    static propTypes = {
      errors: PropTypes.array,
    }

    render() {
      const {
        errors,
      } = this.props

      if (errors) {
        return getErrorComponent(errors, this.props, skipLayout)
      }

      return (
        <PageComponent {...this.props} />
      )
    }
  }
}
