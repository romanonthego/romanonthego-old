import React, {PureComponent, PropTypes} from 'react'
import cx from 'classnames'
import css from './Divider.styl'

export default class Divider extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
  }

  render() {
    const {
      className,
      ...otherProps
    } = this.props

    const cl = cx({
      [css.divider]: true,
      [className]: className,
    })

    return (
      <hr className={cl} {...otherProps} />
    )
  }
}
