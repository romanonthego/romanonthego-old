import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
// import cx from 'classnames'
import css from './DescriptionBlock.styl'

export default class DescriptionBlock extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
  }

  // static defaultProps = {
  //
  // }

  // state = {
  //
  // }

  render() {
    const {children} = this.props

    return (
      <div className={css.descriptionBlock}>
        <span className={css.descriptionText}>{children}</span>
      </div>
    )
  }
}
