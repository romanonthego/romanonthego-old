import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import TextScramble from './TextScramble'
import css from './Tag.styl'

export default class Tag extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }

  static defaultProps = {
    component: 'span',
  }

  render() {
    const {component: Component, children} = this.props

    return (
      <Component className={css.tag}>
        <TextScramble component="span">{children}</TextScramble>
      </Component>
    )
  }
}
