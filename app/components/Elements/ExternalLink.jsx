import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import gaEvent from 'app/utils/analytics/gaEvent'

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

  handleClick = event => {
    gaEvent({
      eventCategory: 'EXTERNAL_LINK',
      eventAction: 'click',
      eventLabel: this.props.to,
    })
  }

  render() {
    const {children, to, ...otherProps} = this.props

    return (
      <a href={to} {...otherProps} data-external onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}
