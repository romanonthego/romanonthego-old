import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'ramda'
import {renderNothing, branch, withProps, pure, setPropTypes} from 'recompose'
import memoize from 'fast-memoize'

const scaleFactor = 0.5 * Math.sqrt(2)
const leftAngle = 45
const rightAngle = 45

const calcRotate = memoize((isLeft, isRight, size) => {
  if (isLeft) {
    return `rotate(${-leftAngle} 0 ${size})`
  }

  if (isRight) {
    return `rotate(${rightAngle} ${size} ${size})`
  }

  return ''
})
const calcTranslate = memoize((x, y) => `translate(${x} ${y})`)
const calcTransform = memoize((...args) => args.join(' '))
const calcSize = memoize(size => size * scaleFactor)
const calcOpacity = memoize((level, maxLevel) => 1 - level / maxLevel + 0.1)

const enhance = compose(
  pure,
  // setting proptypes on top (just looks better this way)
  setPropTypes({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    transform: PropTypes.string,
    nextRight: PropTypes.number,
    nextLeft: PropTypes.number,
    size: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    maxLevel: PropTypes.number.isRequired,
    opacity: PropTypes.number,
  }),
  // render null if level more than max level and if size of the node is less than 1px
  branch(props => props.level > props.maxLevel || props.w < 1, renderNothing),
  // calculating props from memoized functions
  withProps(ownProps => ({
    transform: calcTransform(
      calcTranslate(ownProps.x, ownProps.y),
      calcRotate(ownProps.isLeft, ownProps.isRight, ownProps.size),
    ),
    nextLeft: calcSize(ownProps.size),
    nextRight: calcSize(ownProps.size),
    opacity: calcOpacity(ownProps.level, ownProps.maxLevel),
  })),
)

const PythagorasNode = enhance((props = {}) => {
  // eslint-disable-next-line
  const {size, level, maxLevel, transform, nextLeft, nextRight, opacity} = props

  // retuns new rect and two more nodes
  return (
    <g transform={transform}>
      <rect
        width={size}
        height={size}
        x={0}
        y={0}
        style={{fill: 'white', opacity}}
      />
      <PythagorasNode
        size={nextLeft}
        x={size - nextLeft}
        y={-nextLeft}
        level={level + 1}
        maxLevel={maxLevel}
        isRight
      />
      <PythagorasNode
        size={nextRight}
        x={0}
        y={-nextRight}
        level={level + 1}
        maxLevel={maxLevel}
        isLeft
      />
    </g>
  )
})

export default class PythogorasTree extends PureComponent {
  static propTypes = {
    maxLevel: PropTypes.number,
    lean: PropTypes.number,
  }

  static defaultProps = {
    maxLevel: 11,
    lean: 0,
  }

  render() {
    const {maxLevel, lean} = this.props

    return (
      <svg
        style={{
          height: 480,
          width: 640,
        }}
      >
        <PythagorasNode
          level={1}
          lean={lean}
          maxLevel={maxLevel}
          size={100}
          x={320 - 50}
          y={480 - 100}
        />
      </svg>
    )
  }
}
