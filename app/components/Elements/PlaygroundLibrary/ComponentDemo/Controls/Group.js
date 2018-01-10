import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import DescriptionBlock from 'app/components/Elements/PlaygroundLibrary/DescriptionBlock'
import css from './Group.styl'

export default class Group extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const {name, children} = this.props
    return (
      <label className={css.group}>
        <DescriptionBlock>{name}</DescriptionBlock>
        {children}
      </label>
    )
  }
}
