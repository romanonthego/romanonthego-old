import React, {PureComponent, PropTypes} from 'react'
import cx from 'classnames'
import css from './SubTitle.styl'

export default class SubTitle extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
    className: PropTypes.string,
  }

  static defaultProps = {
    element: 'h2',
  }

  render() {
    const {
      element: Element,
      className,
      children,
      ...otherProps
    } = this.props

    const cl = cx({
      [css.subtitle]: true,
      [className]: className,
    })

    return (
      <Element className={cl} {...otherProps}>
        {children}
      </Element>
    )
  }
}
