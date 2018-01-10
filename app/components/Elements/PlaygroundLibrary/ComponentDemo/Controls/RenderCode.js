import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import stringify from '../stringify'

// const style = {
//   color: '#777',
//   fontSize: '11px',
//   padding: '4px',
//   whiteSpace: 'pre',
//   background: '#fff',
//   overflow: 'auto',
// }

export default class RenderCode extends PureComponent {
  static propTypes = {
    obj: PropTypes.node.isRequired,
    indentDepth: PropTypes.number.isRequired,
  }

  render() {
    const {obj, indentDepth} = this.props

    return (
      <div className="react-demo__render-code">
        {stringify(obj, {depthLim: indentDepth})}
      </div>
    )
  }
}
