import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './index.styl'

export default class TextPrint extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    className: PropTypes.string,
  }

  static defaultProps = {
    component: 'p',
    children: '',
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

  componentWillReceiveProps(newProps) {
    if (newProps.children !== this.props.children) {
      this.setText(newProps.children)
    }
  }

  setText = text => {
    if (!text) {
      return
    }

    this.setState(
      {step: 0, maxStep: text.length, text: text[0], done: false},
      this.animate(),
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
    }

    this.setState(
      {
        step: step + 1,
        text:
          step >= maxStep
            ? children
            : children.substring(0, step) +
              '_' +
              children
                .substring(step, Math.ceil(step + (maxStep - 1 - step) / 2))
                .replace(/\S/g, '·') +
              children
                .substring(step, Math.floor(step + (maxStep - 1 - step) / 2))
                .replace(/\S/g, '\xa0'),
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
    const {component: Component = 'span', className, ...otherProps} = this.props
    const {text, done} = this.state

    return (
      <Component className={cx(className, css.textPrint)} {...otherProps}>
        {text}
        {!done && <span className={css.carret} />}
      </Component>
    )
  }
}
