import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import TextScramble from 'app/components/Elements/TextScramble'
import css from './Email.styl'
import connector from './Email.connector'

const data = {
  name: ['johndoe', 'romanonthego', 'denisyevgen', 'stepanlech', 'illarion'],
}

const getNextItem = (key, currentValue) => {
  const items = data[key]
  const index = items.indexOf(currentValue)
  let nextIndex = index + 1

  if (nextIndex >= items.length) {
    nextIndex = 0
  }

  return items[nextIndex]
}

class Email extends PureComponent {
  static propTypes = {
    emailUncovered: PropTypes.bool.isRequired,
    setEmailUncovered: PropTypes.func.isRequired,
  }

  state = {
    uncovered: this.props.emailUncovered,
    name: getNextItem('name', 0),
  }

  handleUncover = event => {
    if (!this.state.uncovered) {
      this.setState(
        {
          uncovered: true,
        },
        () => {
          this.props.setEmailUncovered(true)
        },
      )

      event.preventDefault()
    }
  }

  handleEmailScramble = key => {
    return () => {
      if (this.state.uncovered) {
        return
      }

      this.setState({
        [key]: getNextItem(key, this.state[key]),
      })
    }
  }

  render() {
    const {
      uncovered,
      name,
      // provider,
    } = this.state

    const hintText = uncovered ? 'okay, you are human' : 'click to uncover'

    const linkProps = uncovered
      ? {
          href: 'mailto:romanonthego@gmail.com',
        }
      : {
          'data-use-title': true,
          'data-title': 'You are not robot, are you?',
        }

    return (
      <a
        {...linkProps}
        onClick={this.handleUncover}
        role="button"
        tabIndex={0}
        className={css.link}
        data-tooltip-position="top"
      >
        <span className={css.hint}>
          <TextScramble>{hintText}</TextScramble>
        </span>
        <span className={css.linkItself}>
          <TextScramble
            component="span"
            onDone={this.handleEmailScramble('name')}
            onDoneTimeout={3600}
          >
            {uncovered ? 'romanonthego' : name}
          </TextScramble>
          @
          <TextScramble component="span">gmail.com</TextScramble>
        </span>
      </a>
    )
  }
}

export default connector(Email)
