import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {TransitionMotion, spring} from 'react-motion'
import cx from 'classnames'
import css from './index.styl'

const springConfig = {stiffness: 146, damping: 32, precision: 0.01}

const renderRoute = ({key, data, style}) => {
  const {opacity} = style

  const cl = cx({
    [css.route]: true,
    [css.animated]: opacity < 1,
  })

  const transitionStyle = {
    opacity,
  }

  return (
    <div key={key} className={cl} style={transitionStyle}>
      {data.children}
    </div>
  )
}

renderRoute.propTypes = {
  key: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
}

const renderInterpolated = interpolatedStyles => {
  return <div className={css.wrap}>{interpolatedStyles.map(renderRoute)}</div>
}

const willEnter = () => {
  return {
    opacity: 1,
  }
}

const willLeave = () => {
  return {
    opacity: spring(0, springConfig),
  }
}

const getStyles = (children, url) => {
  return [
    {
      key: url,
      data: {children},
      style: {
        opacity: 1,
      },
    },
  ]
}

export default class RouteTransition extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    animated: PropTypes.bool,
  }

  static defaultProps = {
    animated: true,
  }

  renderRoutesTransition = () => {
    const {children, url} = this.props

    return (
      <TransitionMotion
        styles={getStyles(children, url)}
        willEnter={willEnter}
        willLeave={willLeave}
      >
        {renderInterpolated}
      </TransitionMotion>
    )
  }

  render() {
    const {animated, children} = this.props

    if (animated) {
      return this.renderRoutesTransition()
    }

    return children
  }
}
