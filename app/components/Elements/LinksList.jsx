import React, {PureComponent, Children} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
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
    moreLink: PropTypes.string,
  }

  static defaultProps = {
    wrapped: false,
    addMore: false,
  }

  renderAndMore = () => {
    const {addMore, moreLink} = this.props

    const text = typeof addMore === 'boolean' ? 'and others' : addMore
    const component = moreLink ? (
      <Link to={moreLink}>{text}</Link>
    ) : (
      <span>{text}</span>
    )

    return <li className={cx(css.item, css.addMore)}>{component}</li>
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
        {addMore && this.renderAndMore()}
      </ul>
    )
  }
}
