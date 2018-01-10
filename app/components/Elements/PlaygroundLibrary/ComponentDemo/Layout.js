import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './Layout.styl'

export default class DemoLayout extends PureComponent {
  static propTypes = {
    panelBelow: PropTypes.bool,
    controlsEl: PropTypes.node.isRequired,
    targetEl: PropTypes.node.isRequired,
    background: PropTypes.oneOf(['dark', 'light', 'none']).isRequired,
  }

  render() {
    const {controlsEl, targetEl, background} = this.props

    return (
      <div className={css.demo}>
        <div className={css.controllsWrap}>
          {controlsEl}
          <div className={css.controlsSpacer} />
        </div>

        <div className={cx({[css[background]]: background}, css.targetWrap)}>
          {targetEl}
        </div>
      </div>
    )
  }
}
