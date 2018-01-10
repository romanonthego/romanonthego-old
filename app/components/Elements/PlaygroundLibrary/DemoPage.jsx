import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Code from './Code'
import DescriptionBlock from './DescriptionBlock'
import css from './DemoPage.styl'

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
        <DescriptionBlock>{name}</DescriptionBlock>
        <Code className={css.fileContent} language={fileNameToLanguage(name)}>
          {content}
        </Code>
      </div>
    )
  }

  render() {
    const {demo, description, files} = this.props

    return (
      <div className={css.content}>
        <div>{demo}</div>
        <div className={css.descriptionWrap}>
          <DescriptionBlock>description</DescriptionBlock>
          <div className={css.description}>{description}</div>
        </div>
        {files && <div className={css.files}>{files.map(this.renderFile)}</div>}
      </div>
    )
  }
}
