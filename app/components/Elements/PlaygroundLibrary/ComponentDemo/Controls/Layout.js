import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import flattenDeep from 'lodash//flattenDeep'
import ControlNoop from './ControlNoop'
import css from './Layout.styl'

export default class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  renderChildren = () =>
    flattenDeep(this.props.children)
      .filter(child => child && child.type !== ControlNoop)
      .map((child, i) => (
        <div key={i} className={css.controlWrap}>
          {child}
        </div>
      ))

  render() {
    return <div className={css.controlsWrap}>{this.renderChildren()}</div>
  }
}
