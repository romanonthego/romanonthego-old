import React, {Component} from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import cx from 'classnames'
import css from './index.styl'
import {castOutputToString, setText, buildNewOutput} from './utils'

export default class TextScamble extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dudClassName: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.string,
    onDone: PropTypes.func,
    onDoneTimeout: PropTypes.number,
  }

  static defaultProps = {
    component: 'span',
    onDoneTimeout: 1,
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
    if (!isEqual(newProps.children, this.props.children)) {
      this.setText(newProps.children)
    }
  }

  shouldComponentUpdate(newProps, newState) {
    // component is not depended on children directly,
    // rather on output[] from children
    return (
      castOutputToString(newState.output) !==
      castOutputToString(this.state.output)
    )
  }

  componentWillUpdate(newProps, newState) {
    const {onDone, onDoneTimeout} = this.props

    const done = newProps.onDone || onDone
    const timeout = newProps.onDoneTimeout || onDoneTimeout

    if (newState.done && onDone) {
      this.onDoneTimeoutRequest = setTimeout(done, timeout)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.onDoneTimeoutRequest)
    this.cancelAnimation()
  }

  // eslint-disable-next-line complexity
  setText(children) {
    if (!children || !children.length) {
      return
    }

    const {oldText} = this.state

    const state = setText(children, oldText)

    this.setState(state, () => {
      this.cancelAnimation()
      this.update()
    })
  }

  update() {
    const {frame, queue} = this.state

    const {newQueue, output, complete} = buildNewOutput(queue, frame)

    const done = complete === queue.length

    this.setState(
      {
        frame: frame + 1,
        queue: newQueue,
        oldText: castOutputToString(output),
        output,
        done,
      },
      () => {
        if (!done) {
          this.animate()
        }
      },
    )
  }

  cancelAnimation() {
    window.cancelAnimationFrame(this.frameRequest)
  }

  animate() {
    this.frameRequest = window.requestAnimationFrame(() => this.update())
  }

  renderChar = ({char, dud = false}, i) => {
    const {dudClassName} = this.props

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
    const {component: Component, className} = this.props

    const {done, output} = this.state

    return (
      <Component className={className}>
        {done
          ? output.map(({char}) => char).join('')
          : output.map(this.renderChar)}
      </Component>
    )
  }
}
