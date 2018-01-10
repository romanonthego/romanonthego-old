import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import flattenDeep from 'lodash//flattenDeep'
import ControlNoop from './ControlNoop'
import css from './Layout.styl'

export default class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onTop: PropTypes.bool.isRequired,
  }

  renderChildren = () =>
    flattenDeep(this.props.children)
      .filter(x => x && x.type !== ControlNoop)
      .map((x, i) => (
        <div key={i} className={css.controlWrap}>
          {x}
        </div>
      ))

  render() {
    return <div className={css.controlsWrap}>{this.renderChildren()}</div>
  }
}
