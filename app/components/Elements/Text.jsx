import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
// import cx from 'classnames'
import css from './Text.styl'

export default class Text extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }

  static defaultProps = {
    component: 'p',
  }

  render() {
    const {children, component: Component} = this.props

    return <Component className={css.text}>{children}</Component>
  }
}
