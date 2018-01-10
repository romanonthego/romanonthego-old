import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import findIndex from 'lodash//findIndex'

export default class InputSelect extends PureComponent {
  static propTypes = {
    value: PropTypes.any,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any,
      }).isRequired,
    ).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange = e => {
    this.props.onChange(this.props.options[e.target.value].value)
  }

  renderOption = (choice, index) => {
    return (
      <option key={index} value={index}>
        {choice.label}
      </option>
    )
  }

  render() {
    const {options, value} = this.props
    return (
      <select
        value={findIndex(options, x => x.value === value)}
        onChange={this.handleChange}
      >
        {options.map(this.renderOption)}
      </select>
    )
  }
}
