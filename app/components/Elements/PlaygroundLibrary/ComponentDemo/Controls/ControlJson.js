import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import InputJson from './InputJson'

export default class ControlJson extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const {name, value, onChange} = this.props
    return (
      <Group name={name}>
        <InputJson value={value} onChange={onChange} />
      </Group>
    )
  }
}
