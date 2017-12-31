import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import {atomDark} from 'react-syntax-highlighter/styles/prism'
// import cx from 'classnames'
import css from './Code.styl'

export default class Code extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  // static defaultProps = {
  //
  // }

  // state = {
  //
  // }

  render() {
    const {children, className} = this.props

    return (
      <SyntaxHighlighter
        language="javascript"
        style={atomDark}
        codeTagProps={{className}}
        className={css.code}
      >
        {children}
      </SyntaxHighlighter>
    )
  }
}
