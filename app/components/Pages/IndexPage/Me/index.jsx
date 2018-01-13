import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {StaggeredMotion, spring} from 'react-motion'
import ThrottledEventsProvider from 'app/components/Providers/ThrottledEventsProvider'
import Path from './Path'
import css from './index.styl'

const springWithParams = val => {
  return spring(val, {stiffness: 60, damping: 8, precision: 0.01})
}

const mapToOpacity = () => ({opacity: 0})

class Me extends Component {
  static propTypes = {
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    paths: PropTypes.array,
    staticMe: PropTypes.bool,
    useMouseTracking: PropTypes.bool,
  }

  static defaultProps = {
    staticMe: false,
    useMouseTracking: true,
  }

  state = {
    x: 0,
    y: 0,
  }

  componentDidMount() {
    if (this.props.useMouseTracking) {
      this.subscribe()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.useMouseTracking && !this.props.useMouseTracking) {
      this.subscribe()
    }

    if (!nextProps.useMouseTracking && this.props.useMouseTracking) {
      this.unsubscribe()
    }
  }

  shouldComponentUpdate(nextProps, {x: newX, y: newY}) {
    if (nextProps.paths !== this.props.paths) {
      return true
    }

    const {x, y} = this.state

    if (x !== newX && y !== newY) {
      return true
    }

    return false
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  subscribe = () => {
    this.subscription = this.props.subscribe(
      'mousemove',
      this.handleMouseMove,
      {useRAF: true},
    )
  }

  unsubscribe = () => {
    this.props.unsubscribe('mousemove', this.subscription)
    this.setState({x: 0, y: 0})
  }

  getDefaultStyles = () => {
    return this.props.paths.map(mapToOpacity)
  }

  handleMouseMove = ({clientX: x, clientY: y}) => {
    const {innerHeight: height, innerWidth: width} = window
    const center = {x: width / 2, y: height / 2}

    this.setState({
      x: Math.round(x - center.x),
      y: Math.round(y - center.y),
    })
  }

  mapStyles = prevInterpolatedStyles => {
    const {paths} = this.props

    return prevInterpolatedStyles.map((prevPaths, i) => {
      if (i === 0) {
        return {opacity: springWithParams(paths[0].fillOpacity)}
      }

      const prevValue =
        prevInterpolatedStyles[i - 1].opacity / paths[i - 1].fillOpacity

      if (prevValue > 0.1) {
        return {
          opacity: springWithParams(paths[i].fillOpacity),
        }
      }

      return {opacity: 0}
    })
  }

  renderPath = (path, i) => {
    const {paths} = this.props

    const {x, y} = this.state

    return (
      <Path
        paths={paths}
        key={i}
        index={i}
        x={x}
        y={y}
        {...paths[i]}
        {...path}
      />
    )
  }

  renderIterpolated = interpolated => {
    return <g>{interpolated.map(this.renderPath)}</g>
  }

  render() {
    const {staticMe} = this.props

    return (
      <aside className={cx(css.me, {[css.staticMe]: staticMe})}>
        {this.props.paths && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402 402">
            <StaggeredMotion
              defaultStyles={this.getDefaultStyles()}
              styles={this.mapStyles}
            >
              {this.renderIterpolated}
            </StaggeredMotion>
          </svg>
        )}
      </aside>
    )
  }
}

export default ThrottledEventsProvider(Me)
