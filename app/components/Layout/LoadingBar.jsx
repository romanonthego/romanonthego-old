import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {TransitionMotion, spring} from 'react-motion'
import css from './LoadingBar.styl'

// const {floor} = Math
const springConfig = {stiffness: 300, damping: 32, precision: 1}

const mapingArray = Array(60)

export default class LoadingBar extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    loading: false,
  }

  getStyles = () => {
    if (!this.props.loading) {
      return []
    }

    return [
      {
        key: 'loading-bar',
        style: {
          width: spring(80, springConfig),
        },
      },
    ]
  }

  willEnter = () => ({width: 0})

  willLeave = () => ({width: spring(120, springConfig)})

  renderProgress = interpolatedStyles => {
    return (
      <div className={css.barContainer}>
        {interpolatedStyles.map(({key, style: {width}}) => (
          <div className={css.bar} key={key}>
            <div className={css.border}>[</div>
            <div className={css.progress}>
              {mapingArray.map((_, i) => {
                const cl = cx({
                  [css.placeholder]: true,
                  [css.active]: width >= i,
                  [css.nextActive]: width === i - 1,
                })

                return (
                  <span key={i} className={cl}>
                    _
                  </span>
                )
              })}
            </div>
            <div className={css.border}>]</div>
          </div>
        ))}
      </div>
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
