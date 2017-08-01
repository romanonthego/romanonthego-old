import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default class ExternalLink extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    target: PropTypes.string,
    rel: PropTypes.string,
  }

  static defaultProps = {
    target: '_blank',
    rel: 'noopener',
  }

  render() {
    const {
      children,
      to,
      ...otherProps
    } = this.props

    return (
      <a href={to} {...otherProps} data-external>
        {children}
      </a>
    )
  }
}
