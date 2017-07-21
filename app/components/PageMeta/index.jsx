import PropTypes from 'prop-types'
import {Children, PureComponent} from 'react'
import withSideEffect from 'react-side-effect'
import omit from 'lodash/omit'

class PageMeta extends PureComponent {
  static displayName = 'PageMeta'

  static propTypes = {
    children: PropTypes.node,
    status: PropTypes.number,
  }

  static defaultProps = {
    status: 200
  }

  render() {
    const {children} = this.props

    if (children) {
      return Children.only(children)
    }

    return null
  }
}

function reducePropsToState(propsList = []) {
  return propsList.reduce((acc, props) => {
    return {...acc, ...omit(props, ['children'])}
  }, {})
}

// eslint-disable-next-line no-empty-function
function handleStateChangeOnClient() {
}

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(PageMeta)
