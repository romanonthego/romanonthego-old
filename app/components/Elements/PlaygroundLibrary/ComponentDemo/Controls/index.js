import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout'
import Log from './Log'

export default class Controls extends PureComponent {
  static propTypes = {
    values: PropTypes.object.isRequired,
    logs: PropTypes.object.isRequired,
    props: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    targetEl: PropTypes.node.isRequired,
    onTop: PropTypes.bool.isRequired,
    codeIndentDepth: PropTypes.number.isRequired,
  }

  handleChange = key => {
    return nextValue => {
      const {onChange, values} = this.props
      onChange({...values, [key]: nextValue})
    }
  }

  renderLog = key => {
    return <Log key={key} name={key} items={this.props.logs[key]} />
  }

  renderControl = key => {
    const {props, values} = this.props
    const Control = props[key].Control
    const controlProps = props[key].controlProps || {}
    const value = values[key]

    return (
      <Control
        {...controlProps}
        key={key}
        name={key}
        value={value}
        onChange={this.handleChange(key)}
      />
    )
  }

  render() {
    const {onTop, props, logs} = this.props
    return (
      <Layout onTop={onTop}>
        {Object.keys(props).map(this.renderControl)}
        {Object.keys(logs).map(this.renderLog)}
      </Layout>
    )
  }
}
