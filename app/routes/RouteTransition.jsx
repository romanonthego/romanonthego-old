import React, {PureComponent} from 'react'
import {TransitionMotion, spring} from 'react-motion'
import css from './RouteTransition.styl'
import cx from 'classnames'
// import reactVendorPrefixes from 'app/utils/reactVendorPrefixes'

const springConfig = {stiffness: 146, damping: 32, precision: 0.01}

export default class RouteTransition extends PureComponent {
  static propTypes = {
    pathname: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    animated: React.PropTypes.bool,
    animationConfig: React.PropTypes.shape({
      stiffness: React.PropTypes.number.isRequired,
      damping: React.PropTypes.number.isRequired,
      precision: React.PropTypes.number,
    }),
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

  willEnter = () => {
    return {
      opacity: 1,
    }
  }


  willLeave = () => {
    return {
      opacity: spring(0, springConfig),
    }
  }


  renderRoute = ({key, data, style}) => {
    const {opacity} = style

    // animated out
    const animated = opacity < 1

    const cl = cx({
      [css.route]: true,
      [css.animated]: animated,
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


  renderRoutesTransition = () => {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {interpolatedStyles =>
          <div className={css.wrap}>
            {interpolatedStyles.map(this.renderRoute)}
          </div>
        }
      </TransitionMotion>
    )
  }

  renderWithoutAnimation() {
    return this.props.children
  }

  render() {
    return this.props.animated ? this.renderRoutesTransition() : this.renderWithoutAnimation()
  }
}
