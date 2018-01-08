import React from 'react'
import createReactClass from 'create-react-class'
import T from 'prop-types'
import Group from './Group'
import InputRange from './InputRange'

export default createReactClass({
  displayName: 'Demo.Controls.ControlRange',

  propTypes: {
    name: T.string.isRequired,
    value: T.number.isRequired,
    onChange: T.func.isRequired,
    min: T.number,
    max: T.number,
    step: T.number,
  },

  render() {
    const {name, value, onChange, min, max, step} = this.props
    return (
      <Group name={name}>
        <InputRange
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
        />
      </Group>
    )
  },
})
