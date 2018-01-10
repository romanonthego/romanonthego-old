import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './SubTitle.styl'

export default class SubTitle extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    className: PropTypes.string,
  }

  static defaultProps = {
    component: 'h2',
  }

  render() {
    const {
      component: Component,
      className,
      children,
      ...otherProps
    } = this.props

    const cl = cx({
      [css.subtitle]: true,
      [className]: className,
    })

    return (
      <Component className={cl} {...otherProps}>
        {children}
      </Component>
    )
  }
}
