import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import throttle from 'lodash/throttle'

export default function VisibilityProvider(
  ComposedComponent,
  visibleOn = 'mount',
) {
  return class extends PureComponent {
    static displayName = `VisibilityProvider(${ComposedComponent.displayName ||
      ComposedComponent.name})`

    static propTypes = {
      children: PropTypes.node,
      targetFPS: PropTypes.oneOf([30, 60]),
    }

    static defaultProps = {
      targetFPS: 60,
    }

    state = {
      visible: false,
    }

    componentDidMount() {
      this.handleMount()
    }

    componentWillUnmount() {
      if (visibleOn === 'scroll') {
        window.removeEventListener('scroll', this.handleScrollThrottled)
      }
    }

    makeVisible() {
      this.setState({
        visible: true,
      })
    }

    handleMount = () => {
      if (visibleOn === 'mount') {
        this.makeVisible()
      }

      if (visibleOn === 'scroll') {
        const throttleTime = 1000 / this.props.targetFPS

        this.handleScrollThrottled = throttle(
          this.handleScroll,
          throttleTime,
        ).bind(this)

        window.addEventListener('scroll', this.handleScrollThrottled)

        this.handleScroll()
      }
    }

    handleScroll = () => {
      const element = this.element

      if (!this.isMounted() || this.state.visible || !element) {
        return
      }

      const elOffsetFromTop = element.getBoundingClientRect().top

      const windowHeight = window.innerHeight

      if (elOffsetFromTop - windowHeight < 0) {
        this.makeVisible()
      }
    }

    render() {
      const {visible} = this.state

      return (
        <ComposedComponent
          ref={element => (this.element = element)} // eslint-disable-line
          {...this.props}
          visible={visible}
        />
      )
    }
  }
}
