import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import InputCheckbox from './InputCheckbox'

export default class ControlBool extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const {name, value, onChange} = this.props

    return (
      <Group name={name}>
        <InputCheckbox value={value} onChange={onChange} />
      </Group>
    )
  }
}
