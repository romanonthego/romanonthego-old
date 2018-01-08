import React from 'react'
import createReactClass from 'create-react-class'
import T from 'prop-types'
import css from './InputRange.styl'

// function styles(invalid) {
//   return {
//     display: 'block',
//     width: '100%',
//     boxSizing: 'border-box',
//     backgroundColor: invalid ? 'pink' : 'white',
//   }
// }

export default createReactClass({
  displayName: 'Demo.Controls.InputRange',

  propTypes: {
    value: T.number.isRequired,
    onChange: T.func.isRequired,
    max: T.number,
    min: T.number,
    step: T.number,
  },

  getInitialState() {
    return {
      strValue: String(this.props.value),
      invalid: false,
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        strValue: String(nextProps.value),
        invalid: false,
      })
    }
  },

  handleChange(event) {
    const strValue = event.target.value
    const value = Number(strValue)
    const invalid = Number.isNaN(value)
    this.setState({strValue, invalid})
    if (!invalid) {
      this.props.onChange(value)
    }
  },

  render() {
    const {min, max, step} = this.props
    const {strValue} = this.state

    return (
      <div className={css.inputRange}>
        <input
          type="range"
          value={strValue}
          onChange={this.handleChange}
          min={min}
          max={max}
          step={step}
        />
        <span>{`[${strValue}]`}</span>
      </div>
    )
  },
})
