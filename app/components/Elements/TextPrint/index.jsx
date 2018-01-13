import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './index.styl'

export default class TextPrint extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    className: PropTypes.string,
    staticRender: PropTypes.bool,
  }

  static defaultProps = {
    component: 'p',
    children: '',
    staticRender: false,
  }

  state = {
    step: 0,
    maxStep: this.props.children ? this.props.children.length : 0,
    text: this.props.children ? this.props.children[0] : '',
    done: false,
  }

  componentDidMount() {
    this.setText(this.props.children)
  }

  componentWillUnmount() {
    this.cancelAnimation()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.children !== this.props.children) {
      this.setText(newProps.children)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.children !== nextProps.children) {
      return true
    }

    if (this.state.text !== nextState.text) {
      return true
    }

    return false
  }

  setText = text => {
    if (!text) {
      return
    }

    this.setState(
      {step: 0, maxStep: text.length, text: text[0], done: false},
      this.animate,
    )
  }

  update = () => {
    const {children} = this.props
    const {step, maxStep, done} = this.state

    if (done) {
      return {}
    }

    if (!children) {
      this.setState({step: 0, maxStep: 0, text: '', done: false}, this.animate)
      return
    }

    const text =
      step >= maxStep
        ? children
        : children.substring(0, step) +
          '_' +
          children
            .substring(step, step + (maxStep - 1 - step))
            .replace(/\S/g, '·')

    this.setState(
      {
        step: step + 1,
        text,
        done: step >= maxStep,
      },
      this.animate,
    )
  }

  cancelAnimation() {
    window.cancelAnimationFrame(this.frameRequest)
  }

  animate() {
    this.frameRequest = window.requestAnimationFrame(() => this.update())
  }

  render() {
    const {
      component: Component = 'span',
      className,
      children, // eslint-disable-line
      staticRender,
      ...otherProps
    } = this.props

    const {text} = this.state

    const cl = cx(className, css.textPrint)

    if (staticRender) {
      return (
        <Component className={cl} {...otherProps}>
          {children}
        </Component>
      )
    }

    return (
      <Component className={cl} {...otherProps}>
        {text}
      </Component>
    )
  }
}
