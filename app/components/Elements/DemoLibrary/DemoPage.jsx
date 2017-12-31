import React, {PureComponent} from 'react'
import T from 'prop-types'
import {unnest, last} from 'ramda'
import Code from './Code'
import css from './DemoPage.styl'

const MONO_FONT = 'Menlo, Monaco, Consolas, "Lucida Console", monospace'
const SERIF_FONT = '"Lucida Grande", Helvetica, arial, sans-serif'

function locationItem(name, i, {length}) {
  const last = length === i + 1
  return [
    <span key={`${i}item`}>{name}</span>,
    !last && <span key={`${i}del`}>/</span>,
  ]
}

export default class DemoPage extends PureComponent {
  static propTypes = {
    demo: T.node,
    fullWidth: T.bool,
    location: T.array.isRequired,
    importPath: T.string,
    name: T.string,
    description: T.node,
    files: T.arrayOf(
      T.shape({name: T.string.isRequired, content: T.string.isRequired})
        .isRequired,
    ),
  }

  renderFile(file, index) {
    return (
      <div key={index} className={css.file}>
        <span className={css.fileName}>{file.name}</span>
        <Code className={css.fileContent}>{file.content}</Code>
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
        <div>
          <div>{description}</div>
        </div>
        <div>{demo}</div>
        {files && <div className={css.files}>{files.map(this.renderFile)}</div>}
      </div>
    )
  }
}
