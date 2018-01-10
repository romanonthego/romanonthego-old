import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

function stringifyFromUntrustedProp(obj) {
  try {
    return JSON.stringify(obj, null, 2)
  } catch (e) {
    return JSON.stringify(
      {
        message: e.message,
      },
      null,
      2,
    )
  }
}

export default class InputJson extends PureComponent {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    strValue: stringifyFromUntrustedProp(this.props.value),
    invalid: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        strValue: stringifyFromUntrustedProp(nextProps.value),
        invalid: false,
      })
    }
  }

  handleChange = event => {
    const strValue = event.target.value
    let invalid = true
    let value
    try {
      value = JSON.parse(strValue)
      invalid = false
    } catch (e) {} // eslint-disable-line no-empty
    this.setState({strValue, invalid})
    if (!invalid) {
      this.props.onChange(value)
    }
  }

  render() {
    const {strValue, invalid} = this.state
    return <textarea rows={4} value={strValue} onChange={this.handleChange} />
  }
}
