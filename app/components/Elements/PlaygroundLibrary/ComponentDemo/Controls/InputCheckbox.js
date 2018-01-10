import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import css from './InputCheckbox.styl'

export default class InputCheckbox extends PureComponent {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange = () => {
    this.props.onChange(!this.props.value)
  }

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
        <span className={css.value}>{value ? '[true]' : '[false]'}</span>
      </div>
    )
  }
}
