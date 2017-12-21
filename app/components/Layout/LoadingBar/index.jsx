import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import cx from 'classnames'
import {TransitionMotion, spring} from 'react-motion'
import css from './index.styl'

const springConfigSlow = {stiffness: 97, damping: 42, precision: 1}
const springConfigFast = {stiffness: 300, damping: 32, precision: 1}

export default class LoadingBar extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    hideWithError: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    loading: false,
    hideWithError: false,
  }

  getStyles = () => {
    if (!this.props.loading) {
      return []
    }

    return [
      {
        key: 'loading-bar',
        style: {
          width: spring(80, springConfigSlow),
        },
      },
    ]
  }

  willEnter = () => ({width: 0})

  willLeave = () => ({width: spring(150, springConfigFast)})

  renderProgress = interpolatedStyles => {
    const {hideWithError} = this.props

    return (
      <nav className={css.barContainer}>
        {interpolatedStyles.map(({key, style: {width}}) => (
          <div
            key={key}
            className={cx(css.bar, {[css.error]: hideWithError})}
            style={{
              width: `${width}%`,
            }}
          />
        ))}
      </nav>
    )
  }

  render() {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {this.renderProgress}
      </TransitionMotion>
    )
  }
}
