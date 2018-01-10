import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import InputSelect from './InputSelect'

export default class ControlChoices extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const {name, value, options, onChange} = this.props
    return (
      <Group name={name}>
        <InputSelect value={value} options={options} onChange={onChange} />
      </Group>
    )
  }
}
