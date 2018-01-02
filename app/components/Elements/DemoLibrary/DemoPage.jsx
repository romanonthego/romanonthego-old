import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {unnest, last} from 'ramda'
import Code from './Code'
import css from './DemoPage.styl'

// const MONO_FONT = 'Menlo, Monaco, Consolas, "Lucida Console", monospace'
// const SERIF_FONT = '"Lucida Grande", Helvetica, arial, sans-serif'

// function locationItem(name, i, {length}) {
//   const last = length === i + 1
//   return [
//     <span key={`${i}item`}>{name}</span>,
//     !last && <span key={`${i}del`}>/</span>,
//   ]
// }

const languages = {
  js: 'jsx',
  jsx: 'jsx',
  styl: 'stylus',
}

const fileNameToLanguage = name => {
  const ext = name.split('.')[1]

  return languages[ext] || 'javascript'
}

export default class DemoPage extends PureComponent {
  static propTypes = {
    demo: PropTypes.node,
    fullWidth: PropTypes.bool,
    location: PropTypes.array.isRequired,
    importPath: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.node,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }

  renderFile({name, content}, index) {
    return (
      <div key={name} className={css.file}>
        <span className={css.fileName}>{name}</span>
        <Code className={css.fileContent} language={fileNameToLanguage(name)}>
          {content}
        </Code>
      </div>
    )
  }

  render() {
    const {
      demo,
      fullWidth,
      location,
      importPath,
      description,
      files,
      name = last(location),
    } = this.props

    return (
      <div className={css.content}>
        <div>{demo}</div>
        <div className={css.descriptionWrap}>
          <span className={css.descriptionLabel}>description</span>
          <div className={css.description}>{description}</div>
        </div>
        {files && <div className={css.files}>{files.map(this.renderFile)}</div>}
      </div>
    )
  }
}
