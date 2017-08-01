import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

const point = ([ponitX, ponitY]) => {
  return [ponitX, ponitY].join(',')
}

const line = (d) => {
  return `M${point(d[0])}L${point(d[1])}L${point(d[2])}Z`
}
const color = (fill, visibility) => {
  return `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, ${1 - visibility})`
}

const visibility = (opacity, fillOpacity) => {
  return 1 - (opacity / fillOpacity)
}

const translate = (paths, index, x, y) => {
  const translateFactor = (1 - ((paths.length - index) / paths.length))
  const randomFactor = 1 // Math.random() * 2

  const directionFactorX = index % 11 === 0 ? -1 : 1
  const directionFactorY = index % 13 === 0 ? -1 : 1

  const translateX = (x / 50) * translateFactor * randomFactor * directionFactorX
  const translateY = (y / 40) * translateFactor * randomFactor * directionFactorY

  return {
    x: translateX,
    y: translateY,
  }
}

const transform = ({x, y}) => {
  return `translate3d(${x}px, ${y}px, 0)`
}


export default class Path extends PureComponent {
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

  render() {
    const {
      paths,
      d,
      fill,
      fillOpacity,
      opacity,
      x,
      y,
      index
    } = this.props

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
