import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import cx from 'classnames'
import css from './Section.styl'

export default class Section extends PureComponent {
  static propTypes = {
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    className: PropTypes.string,
    sectionClassName: PropTypes.string,
    children: PropTypes.node,
    paddingTop: PropTypes.bool,
    paddingBottom: PropTypes.bool,
    colorKey: PropTypes.oneOf(['transparent', 'white']),
  }

  static defaultProps = {
    element: 'section',
    paddingTop: false,
    paddingBottom: false,
    colorKey: 'white',
  }

  render() {
    const {
      children,
      className,
      sectionClassName,
      element: Element,
      paddingTop,
      paddingBottom,
      colorKey,
      ...otherProps
    } = this.props

    const classSection = cx({
      [css.section]: true,
      [sectionClassName]: sectionClassName,
      [css.paddingTop]: paddingTop,
      [css.paddingBottom]: paddingBottom,
      [css[colorKey]]: colorKey,
    })

    const cl = cx({
      [css.main]: true,
      [className]: className,
    })

    return (
      <Element className={classSection} {...otherProps}>
        <main className={cl}>{children}</main>
      </Element>
    )
  }
}
