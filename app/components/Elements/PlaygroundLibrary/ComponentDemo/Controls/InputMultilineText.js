import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default class InputMultilineText extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange = e => {
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <textarea
        rows={4}
        value={this.props.value}
        onChange={this.handleChange}
      />
    )
  }
}
