import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ShuffleChar from './ShuffleChar'
import css from './ShuffleText.styl'

class ShuffleText extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    shuffle: PropTypes.bool,
    element: PropTypes.string,
    charClassName: PropTypes.string,
    countMultiplier: PropTypes.number,
    timeoutMultiplier: PropTypes.number,
  }

  static defaultProps = {
    element: 'span',
    countMultiplier: 1,
    timeoutMultiplier: 1,
  }

  renderChar = (char, i) => {
    const {
      countMultiplier,
      timeoutMultiplier,
      charClassName,
    } = this.props

    if (char !== ' ' && char !== '-') {
      return (
        <ShuffleChar
          char={char}
          key={i}
          className={charClassName}
          countMultiplier={countMultiplier}
          timeoutMultiplier={timeoutMultiplier}
        />
      )
    }

    return char
  }

  render() {
    const {
      children,
      element: Element,
      // charClassName,
      // shuffle,
      // element,
      // countMultiplier,
      // timeoutMultiplier,
      ...otherProps
    } = this.props

    const string = [...children].map(this.renderChar)

    return (
      <Element
        className={css.text}
        {...otherProps}
      >
        {string}
      </Element>
    )
  }
}

export default ShuffleText
