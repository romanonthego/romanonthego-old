import React, {PureComponent, Children} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './LinksList.styl'

const renderItem = (child, i) => {
  const props = {
    key: i,
    className: css.item,
  }

  return <li {...props}>{child}</li>
}

export default class LinksList extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    wrapped: PropTypes.bool,
    addMore: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }

  static defaultProps = {
    wrapped: false,
    addMore: false,
  }

  render() {
    const {children, wrapped, addMore} = this.props

    const childrenArray = Children.toArray(children)

    const cl = cx({
      [css.list]: true,
      [css.wrapped]: wrapped,
    })

    return (
      <ul className={cl}>
        {childrenArray.map(renderItem)}
        {addMore && (
          <li className={cx(css.item, css.addMore)}>
            {typeof addMore === 'boolean' ? 'and others' : addMore}
          </li>
        )}
      </ul>
    )
  }
}
