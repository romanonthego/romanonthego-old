import React, {Component} from 'react'
import PropTypes from 'prop-types'
import memoize from 'fast-memoize'

const factors = memoize((length, index) => {
  return {
    translateFactor: 1 - (length - index) / length,
    randomFactor: 1,
    directionFactorX: index % 11 === 0 ? -1 : 1,
    directionFactorY: index % 13 === 0 ? -1 : 1,
  }
})

const point = memoize((p = []) => {
  return p.join(',')
})

const line = memoize(([p1, p2, p3]) => {
  return `M${point(p1)}L${point(p2)}L${point(p3)}Z`
})

const color = memoize(([r, g, b], alfa) => {
  return `rgba(${r}, ${g}, ${b}, ${1 - alfa})`
})

const visibility = (opacity, fillOpacity, x, y) => {
  return 1 - opacity / fillOpacity
}

const translate = (paths, index, x, y) => {
  const {
    translateFactor,
    randomFactor,
    directionFactorX,
    directionFactorY,
  } = factors(paths.length, index)

  const translateX = x / 50 * translateFactor * randomFactor * directionFactorX
  const translateY = y / 40 * translateFactor * randomFactor * directionFactorY

  return {
    x: translateX,
    y: translateY,
  }
}

const transform = ({x, y}) => {
  return `translate3d(${x}px, ${y}px, 0)`
}

export default class Path extends Component {
  static propTypes = {
    paths: PropTypes.array.isRequired,
    d: PropTypes.arrayOf(PropTypes.array).isRequired,
    fill: PropTypes.arrayOf(PropTypes.number).isRequired,
    fillOpacity: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
  }

  static defaultProps = {
    x: 0,
    y: 0,
    opacity: 0,
    fillOpacity: 0,
  }

  shouldComponentUpdate(newProps) {
    const {x, y, opacity} = this.props

    return newProps.x !== x || newProps.y !== y || newProps.opacity !== opacity
  }

  render() {
    const {paths, d, fill, fillOpacity, opacity, x, y, index} = this.props

    return (
      <path
        d={line(d)}
        fillOpacity={opacity}
        fill={color(fill, visibility(opacity, fillOpacity))}
        style={{transform: transform(translate(paths, index, x, y))}}
      />
    )
  }
}
