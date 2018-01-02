import React from 'react'
import createReactClass from 'create-react-class'
import T from 'prop-types'
import css from './InputCheckbox.styl'

export default createReactClass({
  displayName: 'Demo.Controls.InputCheckbox',

  propTypes: {
    value: T.bool.isRequired,
    onChange: T.func.isRequired,
  },

  handleChange() {
    this.props.onChange(!this.props.value)
  },

  render() {
    const {value} = this.props

    return (
      <div className={css.inputCheckbox}>
        <input
          type="checkbox"
          checked={value}
          onChange={this.handleChange}
          className={css.checkbox}
        />
        <span>{value ? '[true]' : '[false]'}</span>
      </div>
    )
  },
})
