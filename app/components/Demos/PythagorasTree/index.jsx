import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

const deg = rads => {
  return rads * (180 / Math.PI)
}

const factor = 0.5 * Math.sqrt(2)

const Pythagoras = ({left, right, w, x, y, level, maxLevel} = {}) => {
  // does not render boxes with level more than max
  if (level > maxLevel) {
    return null
  }

  // does not render boxes less then 1px
  if (w < 1) {
    return null
  }

  const nextLeft = factor * w
  const nextRight = factor * w
  const leftAngle = 45
  const rightAngle = 45

  let rotate = ''

  if (left) {
    rotate = `rotate(${-leftAngle} 0 ${w})`
  } else if (right) {
    rotate = `rotate(${rightAngle} ${w} ${w})`
  }

  return (
    <g transform={`translate(${x} ${y}) ${rotate}`}>
      <rect
        width={w}
        height={w}
        x={0}
        y={0}
        style={{fill: 'white', opacity: 1 - level / maxLevel}}
      />
      <Pythagoras
        w={nextLeft}
        x={w - nextLeft}
        y={-nextLeft}
        level={level + 1}
        maxLevel={maxLevel}
        right
      />
      <Pythagoras
        w={nextRight}
        x={0}
        y={-nextRight}
        level={level + 1}
        maxLevel={maxLevel}
        left
      />
    </g>
  )
}

export default class PythogorasTree extends PureComponent {
  static propTypes = {
    maxLevel: PropTypes.number,
  }

  static defaultProps = {
    maxLevel: 11,
  }

  render() {
    const {maxLevel} = this.props

    return (
      <svg
        style={{
          height: 480,
          width: 640,
          // width: 100,
          // marginTop: 600 - 100,
          // overflow: 'visible',
        }}
      >
        <Pythagoras
          level={1}
          maxLevel={maxLevel}
          w={100}
          x={320 - 50}
          y={480 - 100}
        />
      </svg>
    )
  }
}
