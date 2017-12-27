import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import TextScramble from './TextScramble'
import css from './Tag.styl'

export default class Tag extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }

  static defaultProps = {
    element: 'span',
  }

  render() {
    const {element: Element, children} = this.props

    return (
      <Element className={css.tag}>
        <TextScramble component="span">{children}</TextScramble>
      </Element>
    )
  }
}
