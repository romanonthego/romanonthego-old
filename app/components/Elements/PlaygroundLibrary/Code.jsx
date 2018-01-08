import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/prism-light'
import jsx from 'react-syntax-highlighter/languages/prism/jsx'
import javascript from 'react-syntax-highlighter/languages/prism/javascript'
import stylus from 'react-syntax-highlighter/languages/prism/stylus'
import atomDarkStyle from 'react-syntax-highlighter/styles/prism/atom-dark'
import css from './Code.styl'

const langs = {jsx, javascript, stylus}

Object.keys(langs).map(lang => registerLanguage(lang, langs[lang]))

export default class Code extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    language: PropTypes.string,
  }

  static defaultProps = {
    language: 'jsx',
  }

  render() {
    const {children, className, language} = this.props

    return (
      <SyntaxHighlighter
        language={language}
        style={atomDarkStyle}
        codeTagProps={{className}}
        className={css.code}
      >
        {children}
      </SyntaxHighlighter>
    )
  }
}
