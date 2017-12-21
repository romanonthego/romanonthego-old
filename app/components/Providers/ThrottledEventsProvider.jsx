import React, {PureComponent} from 'react'
import throttle from 'lodash/throttle'
import remove from 'lodash/remove'

export default function throttledEventsProvider(Component) {
  return class ThrottledEventsProvider extends PureComponent {
    static displayName = `ThrottledEventsProvider(${Component.displayName ||
      Component.name})`

    state = {
      handlers: {
        scroll: [],
        resize: [],
        orientationchange: [],
        mousemove: [],
      },
    }

    componentDidMount() {
      this.subscribeAll()
    }

    componentWillUnmount() {
      this.unsubscribeAll()
    }

    subscribeAll() {
      const {handlers} = this.state

      Object.keys(handlers).forEach(k =>
        handlers[k].forEach(h => this.subscribeHandler(k, h)),
      )
    }

    unsubscribeAll() {
      const {handlers} = this.state

      Object.keys(handlers).forEach(k =>
        handlers[k].forEach(h => this.unsubscribeHandler(k, h)),
      )
    }

    subscribeHandler = (event, handler) => {
      window.addEventListener(event, handler)
    }

    unsubscribeHandler = (event, handler) => {
      window.removeEventListener(event, handler)
    }

    getThrottledFunction = (handler, useRAF, targetFPS) => {
      const {requestAnimationFrame} = window

      // in 90% browsers you could use `requestAnimationFrame` unprefixed
      // throttle will be our polyfill
      if (requestAnimationFrame && useRAF) {
        return function throttledFunction(...args) {
          this.RAFid = requestAnimationFrame(() => handler(...args))
        }
      }

      return throttle(handler, 1000 / targetFPS)
    }

    subscribe = (event, handler, {useRAF = true, targetFPS = 60} = {}) => {
      const {handlers} = this.state
      const handlerThrottled = this.getThrottledFunction(
        handler,
        useRAF,
        targetFPS,
      )

      this.setState(
        {
          handlers: {
            ...handlers,
            [event]: [
              ...(handlers[event] ? handlers[event] : []),
              handlerThrottled,
            ],
          },
        },
        () => {
          this.subscribeHandler(event, handlerThrottled)
        },
      )

      return handlerThrottled
    }

    unsubscribe = (event, handler) => {
      const {handlers} = this.state

      const canUnsubscribe =
        handlers[event] && handlers[event].indexOf(handler) > -1

      if (canUnsubscribe) {
        this.setState(
          {
            handlers: {
              ...handlers,
              [event]: remove(handlers, h => h === handler),
            },
          },
          () => {
            this.unsubscribeHandler(event, handler)

            if (handler.RAFid) {
              window.cancelAnimationFrame(handler.RAFid)
            }
          },
        )
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          subscribe={this.subscribe}
          unsubscribe={this.unsubscribe}
        />
      )
    }
  }
}
