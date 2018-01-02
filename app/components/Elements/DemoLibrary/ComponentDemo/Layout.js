import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './Layout.styl'

// const bgImages = {
//   dark:
//     'url("data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20200%20200%22%3E%3Cg%3E%3Cpath%20fill=%22#777%22%20d=%22M0%200h100v100H0zm100%20100h100v100H100z%22/%3E%3Cpath%20fill=%22#555%22%20d=%22M100%200h100v100H100zM0%20100h100v100H0z%22/%3E%3C/g%3E%3C/svg%3E")',
//   light:
//     'url("data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20200%20200%22%3E%3Cg%3E%3Cpath%20fill=%22#eee%22%20d=%22M0%200h100v100H0zm100%20100h100v100H100z%22/%3E%3Cpath%20fill=%22#fff%22%20d=%22M100%200h100v100H100zM0%20100h100v100H0z%22/%3E%3C/g%3E%3C/svg%3E")',
//   none: 'none',
// }

export default class DemoLayout extends PureComponent {
  static propTypes = {
    fullWidth: PropTypes.bool.isRequired,
    panelBelow: PropTypes.bool,
    controlsEl: PropTypes.node.isRequired,
    targetEl: PropTypes.node.isRequired,
    background: PropTypes.oneOf(['dark', 'light', 'none']).isRequired,
  }

  // getTagretStyle() {
  //   const {fullWidth} = this.props
  //   return {
  //     ...(fullWidth ? styleComponentTop : styleComponentSide),
  //     padding: !fullWidth ? '1em' : '1em 0',
  //   }
  // }

  // getWrapStyle() {
  //   const {fullWidth, background} = this.props
  //   return {
  //     ...style,
  //     borderWidth: fullWidth ? '1px 0' : '1px',
  //     backgroundImage: bgImages[background],
  //     backgroundColor: bgColors[background],
  //   }
  // }

  // getControlsStyle() {
  //   return this.props.fullWidth ? styleControlsBottom : styleControlsSide
  // }

  render() {
    const {controlsEl, targetEl, background} = this.props

    const demo = (
      <div
        className={cx({[css[background]]: background}, css.targetWrap)}
        key="demo"
      >
        {targetEl}
      </div>
    )

    const panel = (
      <div className={css.controllsWrap} key="panel">
        {controlsEl}
      </div>
    )
    return <div className={css.demo}>{[panel, demo]}</div>
  }
}
