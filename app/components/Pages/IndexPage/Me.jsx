import React, {PureComponent, PropTypes} from 'react'
import {StaggeredMotion, spring} from 'react-motion'
import InlineSVG from 'svg-inline-react'
import ThrottledEventsProvider from 'app/components/Providers/ThrottledEventsProvider'
import css from './Me.styl'
import mePaths from './mePaths'
import me from '!!svg-inline-loader!./assets/me.svg' // eslint-disable-line

const Path = ({d, fill, fillOpacity, opacity, x = 0, y = 0, i} = {}) => {
  const visibility = 1 - (opacity / fillOpacity)
  const point = ([ponitX, ponitY]) => {
    return [
      ponitX,
      ponitY,
    ].join(',')
  }

  const line = `M${point(d[0])}L${point(d[1])}L${point(d[2])}Z`
  const color = `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, ${1 - visibility})`

  const translateFactor = (1 - ((mePaths.length - i) / mePaths.length))
  const randomFactor = 1 // Math.random() * 2

  const translateX = (x / 50) * translateFactor * randomFactor
  const translateY = (y / 40) * translateFactor * randomFactor

  const props = {
    d: line,
    fillOpacity: opacity,
    fill: color,
    style: {
      transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
    },
  }

  return (
    <path {...props} />
  )
}

class Me extends PureComponent {
  static propTypes = {
    useDynamicVersion: PropTypes.bool,
    subscribe: PropTypes.func.isRequired,
  }

  static defaultProps = {
    useDynamicVersion: true,
  }

  state = {
    paths: mePaths,
    x: 0,
    y: 0,
  }

  componentDidMount() {
    this.props.subscribe('mousemove', this.handleMouseMove, {useRAF: true})
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.x !== this.state.x && nextState.y !== this.state.y) {
      return true
    }

    return false
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

  spring(val) {
    return spring(val, {stiffness: 60, damping: 8, precision: 0.01})
  }

  mapStyles = (prevInterpolatedStyles) => {
    const {
      paths,
    } = this.state

    return prevInterpolatedStyles.map((prevPaths, i) => {
      if (i === 0) {
        return {opacity: this.spring(paths[0].fillOpacity)}
      }

      const prevValue = prevInterpolatedStyles[i - 1].opacity / paths[i - 1].fillOpacity

      return prevValue > 0.01 ? {opacity: this.spring(paths[i].fillOpacity)} : {opacity: 0}
    })
  }

  getDefaultStyles() {
    const {
      paths,
    } = this.state

    return paths.map(() => ({opacity: 0}))
  }

  renderPath = (path, i) => {
    const {
      paths,
      x,
      y,
    } = this.state

    return (
      <Path
        key={i}
        index={i}
        x={x}
        y={y}
        i={i}
        {...paths[i]}
        {...path}
      />
    )
  }

  render() {
    const {
      useDynamicVersion,
    } = this.props

    return (
      <aside className={css.me}>
        {useDynamicVersion && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402 402">
            <StaggeredMotion
              defaultStyles={this.getDefaultStyles()}
              styles={this.mapStyles}
            >
              {(interpolated) =>
                <g>
                  {interpolated.map(this.renderPath)}
                </g>
              }
            </StaggeredMotion>
          </svg>
        )}

        {!useDynamicVersion && (
          <InlineSVG src={me} className={css.meStatic} />
        )}
      </aside>
    )
  }
}

export default ThrottledEventsProvider(Me)
