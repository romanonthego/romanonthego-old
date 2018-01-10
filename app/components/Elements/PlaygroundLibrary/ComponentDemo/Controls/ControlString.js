import React, {PureComponent} from 'react'
import T from 'prop-types'
import Group from './Group'
import InputText from './InputText'

export default class ControlString extends PureComponent {
  static propTypes = {
    name: T.string.isRequired,
    value: T.string.isRequired,
    onChange: T.func.isRequired,
  }

  render() {
    const {name, value, onChange} = this.props
    return (
      <Group name={name}>
        <InputText value={value} onChange={onChange} />
      </Group>
    )
  }
}
