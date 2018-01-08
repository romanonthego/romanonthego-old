import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import DescriptionBlock from 'app/components/Elements/PlaygroundLibrary/DescriptionBlock'
import css from './Group.styl'

// const style = {
//   fontSize: '11px',
//   display: 'block',
//   padding: '4px',
// }
// const styleLabel = {
//   display: 'block',
//   color: '#666',
// }

export default createReactClass({
  displayName: 'Demo.Controls.Group',

  propTypes: {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  },

  render() {
    const {name, children} = this.props
    return (
      <label className={css.group}>
        <DescriptionBlock>{name}</DescriptionBlock>
        {children}
      </label>
    )
  },
})
