import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import InputMultilineText from './InputMultilineText'

export default class ControlText extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const {name, value, onChange} = this.props
    return (
      <Group name={name}>
        <InputMultilineText value={value} onChange={onChange} />
      </Group>
    )
  }
}
