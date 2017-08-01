import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import sample from 'lodash/sample'
import random from 'lodash/random'
import css from './ShuffleChar.styl'

// const poolRus = `ЙАПРОЛДЖЭЁИТЬБЮ`.split(``)
const poolEng = 'ABCDEFGHIJKLMN'.split('')

function randomChar(char) {
  return sample(poolEng)
}

export default class ShuffleChar extends PureComponent {
  static propTypes = {
    char: PropTypes.string.isRequired,
    countMultiplier: PropTypes.number,
    timeoutMultiplier: PropTypes.number,
    className: PropTypes.string,
    shuffle: PropTypes.bool,
  }

  static defaultProps = {
    countMultiplier: 1,
    timeoutMultiplier: 1,
  }

  state = {
    char: this.props.char,
    count: 0,
    maxCount: random(2, 4) * this.props.countMultiplier,
    timeout: random(2, 12) * 10 * this.props.timeoutMultiplier,
  }

  componentDidMount() {
    this.handleMount()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shuffle) {
      this.setState({
        char: nextProps.char,
        count: 0,
        maxCount: random(2, 4),
        timeout: random(2, 12) * 10,
      }, () => this.handleMount())
    }
  }

  componentWilUnmount() {
    clearTimeout(this.timeout)
  }

  handleMount() {
    const {char} = this.props
    const {count, maxCount, timeout} = this.state

    this.setState({
      timeout: timeout * 0.9,
    })

    if (count === maxCount + 1) {
      return
    }

    this.timeout = setTimeout(() => {
      this.setState({
        char: count === maxCount ? char : randomChar(char),
        count: count + 1,
      })
      this.handleMount()
    }, timeout)
  }

  render() {
    const {
      className,
    } = this.props

    const {
      char,
      count,
    } = this.state

    const style = count === 0 ? {opacity: 0} : {}

    return (
      <span
        className={cx(css.char, className)}
        style={style}
        data-text={char}
      >
        {char}
      </span>
    )
  }
}
