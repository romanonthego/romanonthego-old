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
    language: PropTypes.string,
  }

  static defaultProps = {
    language: 'jsx',
  }

  // state = {
  //
  // }

  render() {
    const {children, className, language} = this.props

    return (
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        codeTagProps={{className}}
        className={css.code}
      >
        {children}
      </SyntaxHighlighter>
    )
  }
}
