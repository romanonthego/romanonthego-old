import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './Divider.styl'

export default class Divider extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
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
