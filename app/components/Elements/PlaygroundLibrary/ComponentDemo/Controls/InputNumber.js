import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default class InputNumber extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    max: PropTypes.number,
    min: PropTypes.number,
  }

  state = {
    strValue: String(this.props.value),
    invalid: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        strValue: String(nextProps.value),
        invalid: false,
      })
    }
  }

  handleChange = event => {
    const strValue = event.target.value
    const value = Number(strValue)
    const invalid = Number.isNaN(value)
    this.setState({strValue, invalid})
    if (!invalid) {
      this.props.onChange(value)
    }
  }

  render() {
    const {min, max} = this.props
    const {strValue} = this.state

    return (
      <input
        type="number"
        value={strValue}
        onChange={this.handleChange}
        min={min}
        max={max}
      />
    )
  }
}
