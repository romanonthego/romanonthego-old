import React, {PureComponent, PropTypes} from 'react'
import cx from 'classnames'
import css from './index.styl'

const {floor, random} = Math

const scrambledChars = '!<>-_\\/[]{}—=+*^?#________'

const randomChar = (chars = scrambledChars) => {
  return chars[floor(random() * chars.length)]
}

const castOutputToString = (output) => {
  return output.reduce((acc, {char}) => {
    return acc + char
  }, '')
}

export default class TextScamble extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dudClassName: PropTypes.string,
    element: PropTypes.oneOf([PropTypes.func, PropTypes.string]),
    onDone: PropTypes.func,
    onDoneTimeout: PropTypes.number,
    chars: PropTypes.string,
  }

  static defaultProps = {
    element: 'span',
    onDoneTimeout: 1,
    chars: scrambledChars,
  }

  state = {
    frame: 0,
    output: [],
    newText: this.props.children,
    oldText: '',
    queue: [],
    done: false,
  }

  componentDidMount() {
    this.setText(this.props.children)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.children !== this.props.children) {
      this.setText(newProps.children)
    }
  }

  shouldComponentUpdate(newProps, newState) {
    // component is not depended on children directly,
    // rather on output[] from children
    if (castOutputToString(newState.output) !== castOutputToString(this.state.output)) {
      return true
    }

    return false
  }

  componentWillUpdate(newProps, newState) {
    const onDone = newProps.onDone || this.props.onDone
    const onDoneTimeout = newProps.onDoneTimeout || this.props.onDoneTimeout

    if (newState.done && onDone) {
      this.onDoneTimeoutRequest = setTimeout(onDone, onDoneTimeout)
    }
  }

  componentWillUumount() {
    clearTimeout(this.onDoneTimeoutRequest)
  }

  // eslint-disable-next-line complexity
  setText(children) {
    const {
      oldText,
      // newText,
    } = this.state

    const queue = []
    const frame = 0

    if (!children || !children.length) {
      return
    }

    for (let i = 0, len = children.length; i < len; i++) {
      const from = oldText[i] || ''
      const to = children[i] || ''
      const start = floor(random() * 40)
      const end = start + floor(random() * 40)

      queue.push({from, to, start, end})
    }

    this.setState({
      queue,
      frame,
      newText: children,
      done: false,
    }, () => {
      this.cancelAnimation()
      this.update()
    })
  }

  update() {
    const {
      frame,
      queue,
    } = this.state

    const {
      newQueue,
      output,
      complete,
    } = this.buildNewOutput(queue, frame)

    const done = complete === queue.length

    this.setState({
      frame: frame + 1,
      queue: newQueue,
      oldText: castOutputToString(output),
      output,
      done,
    }, () => {
      if (!done) {
        this.animate()
      }
    })
  }

  // eslint-disable-next-line complexity
  buildNewOutput(queue, frame) {
    let complete = 0
    const output = []
    const newQueue = [...queue]

    for (let i = 0, n = queue.length; i < n; i++) {
      const {
        from,
        to,
        start,
        end,
        char = null,
      } = queue[i]

      if (frame >= end) {
        complete++
        output.push({char: to})
      }

      if (frame < end && frame >= start) {
        if (!char || random() < 0.28) {
          newQueue[i].char = randomChar(this.props.chars)
        }
        output.push({dud: true, char})
      }

      if (frame < end && frame < start) {
        output.push({char: from})
      }
    }

    return {
      newQueue,
      output,
      complete,
    }
  }

  cancelAnimation() {
    window.cancelAnimationFrame(this.frameRequest)
  }

  animate() {
    this.frameRequest = window.requestAnimationFrame(() => this.update())
  }

  renderChar = ({char, dud = false}, i) => {
    const {
      dudClassName,
    } = this.props

    const cl = cx({
      [css.char]: true,
      [css.dud]: dud && !dudClassName,
      [dudClassName]: dud && dudClassName,
    })

    return (
      <span className={cl} key={i}>
        {char}
      </span>
    )
  }

  render() {
    const {
      element: Element,
      onDone, // eslint-disable-line
      onDoneTimeout, // eslint-disable-line
      chars, // eslint-disable-line
      ...otherProps
    } = this.props

    const {
      output,
    } = this.state

    return (
      <Element {...otherProps}>
        {output.map(this.renderChar)}
      </Element>
    )
  }
}
