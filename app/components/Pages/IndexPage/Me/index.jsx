import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {StaggeredMotion, spring} from 'react-motion'
import ThrottledEventsProvider from 'app/components/Providers/ThrottledEventsProvider'
import Path from './Path'
import css from './index.styl'

const springWithParams = (val) => {
  return spring(val, {stiffness: 60, damping: 8, precision: 0.01})
}

const mapToOpacity = () => ({opacity: 0})

class Me extends Component {
  static propTypes = {
    subscribe: PropTypes.func.isRequired,
    paths: PropTypes.array.isRequired,
  }

  static defaultProps = {
  }

  state = {
    x: 0,
    y: 0,
  }

  componentDidMount() {
    this.props.subscribe('mousemove', this.handleMouseMove, {useRAF: true})
  }

  shouldComponentUpdate(nextProps, {x: newX, y: newY}) {
    const {x, y} = this.state

    if (x !== newX && y !== newY) {
      return true
    }

    return false
  }

  getDefaultStyles = () => {
    return this.props.paths.map(mapToOpacity)
  }


  handleMouseMove = (event) => {
    const body = document.querySelectorAll('body')[0]

    const bodyHeight = body.clientHeight
    const bodyWidth = body.clientWidth
    const center = {x: bodyWidth / 2, y: bodyHeight / 2}

    this.setState({
      x: Math.round(event.clientX - center.x),
      y: Math.round(event.clientY - center.y),
    })
  }

  mapStyles = (prevInterpolatedStyles) => {
    const {
      paths
    } = this.props

    return prevInterpolatedStyles.map((prevPaths, i) => {
      if (i === 0) {
        return {opacity: springWithParams(paths[0].fillOpacity)}
      }

      const prevValue = prevInterpolatedStyles[i - 1].opacity / paths[i - 1].fillOpacity

      if (prevValue > 0.01) {
        return {
          opacity: springWithParams(paths[i].fillOpacity)
        }
      }

      return {opacity: 0}
    })
  }

  renderPath = (path, i) => {
    const {
      paths,
    } = this.props

    const {
      x,
      y,
    } = this.state

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

  renderIterpolated = (interpolated) => {
    return (
      <g>
        {interpolated.map(this.renderPath)}
      </g>
    )
  }

  render() {
    return (
      <aside className={css.me}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402 402">
          <StaggeredMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.mapStyles}
          >
            {this.renderIterpolated}
          </StaggeredMotion>
        </svg>
      </aside>
    )
  }
}

export default ThrottledEventsProvider(Me)
