import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

export default class index extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }

  static defaultProps = {
    title: 'romanonthego.rocks',
    description: 'romanonthego.rocks',
  }

  render() {
    const {title, description} = this.props

    return (
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
    )
  }
}
