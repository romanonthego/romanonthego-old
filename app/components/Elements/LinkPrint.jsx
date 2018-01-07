import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import ExternalLink from './ExternalLink'
import TextPrint from './TextPrint'
// import cx from 'classnames'
// import css from './LinkPrint.styl'

export default class LinkPrint extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
  }

  getElement = () => {
    const {to} = this.props

    return to.includes('http') ? ExternalLink : Link
  }

  getElementProps = () => {
    const {to} = this.props

    return to.includes('http') ? {'data-external': true} : {}
  }

  render() {
    const {children, to, ...otherProps} = this.props

    const Element = this.getElement()
    const elementProps = this.getElementProps()

    return (
      <Element to={to} {...elementProps} {...otherProps}>
        <TextPrint component="span">{children}</TextPrint>
      </Element>
    )
  }
}
