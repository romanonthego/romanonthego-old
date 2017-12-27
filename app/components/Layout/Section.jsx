import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './Section.styl'

export default class Section extends PureComponent {
  static propTypes = {
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    className: PropTypes.string,
    children: PropTypes.node,
    paddingTop: PropTypes.bool,
    paddingBottom: PropTypes.bool,
  }

  static defaultProps = {
    element: 'section',
    paddingTop: true,
    paddingBottom: true,
  }

  render() {
    const {
      children,
      className,
      element: Element,
      paddingTop,
      paddingBottom,
      ...otherProps
    } = this.props

    const classSection = cx({
      [className]: className && className.length,
      [css.section]: true,
      [css.paddingTop]: paddingTop,
      [css.paddingBottom]: paddingBottom,
    })

    return (
      <Element className={classSection} {...otherProps}>
        {children}
      </Element>
    )
  }
}
