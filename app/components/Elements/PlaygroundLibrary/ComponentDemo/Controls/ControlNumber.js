import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import InputNumber from './InputNumber'

export default class ControlNumber extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
  }

  render() {
    const {name, value, onChange, min, max} = this.props
    return (
      <Group name={name}>
        <InputNumber value={value} onChange={onChange} min={min} max={max} />
      </Group>
    )
  }
}
