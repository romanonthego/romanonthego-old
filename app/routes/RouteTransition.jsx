import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {TransitionMotion, spring} from 'react-motion'
import css from './RouteTransition.styl'
// import reactVendorPrefixes from 'app/utils/reactVendorPrefixes'

const springConfig = {stiffness: 146, damping: 32, precision: 0.01}

const renderRoute = (interpolated = {}) => {
  const {
    key,
    data: {
      children
    } = {},
    style: {
      opacity
    } = {}
  } = interpolated

  const cl = cx({
    [css.route]: true,
    [css.animated]: opacity < 1,
  })

  return (
    <div key={key} className={cl} style={{opacity}}>
      {children}
    </div>
  )
}

const willEnter = () => ({
  opacity: 1,
})


const willLeave = () => ({
  opacity: spring(0, springConfig),
})


export default class RouteTransition extends PureComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    animated: PropTypes.bool,
  }

  static defaultProps = {
    animated: true,
  }


  getStyles = () => {
    const {
      children,
      pathname
    } = this.props

    return [
      {
        key: pathname,
        data: {children},
        style: {
          opacity: 1,
        },
      },
    ]
  }

  renderRoutesTransition = () => {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={willEnter}
        willLeave={willLeave}
      >
        {(interpolatedStyles) =>
          <div className={css.wrap}>
            {interpolatedStyles.map(renderRoute)}
          </div>
        }
      </TransitionMotion>
    )
  }

  renderWithoutAnimation() {
    return this.props.children
  }

  render() {
    const {
      animated
    } = this.props

    if (animated) {
      return this.renderRoutesTransition()
    }

    return this.renderWithoutAnimation()
  }
}
