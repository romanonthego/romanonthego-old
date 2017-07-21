import React, {PureComponent, PropTypes, Children} from 'react'
import cx from 'classnames'
import css from './LinksList.styl'

export default class LinksList extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    wrapped: PropTypes.bool,
    addMore: PropTypes.oneOf([PropTypes.bool, PropTypes.string]),
  }

  static defaultProps = {
    wrapped: false,
    addMore: false,
  }

  renderItem(child, i) {
    return (
      <li key={i} className={css.item}>
        {child}
      </li>
    )
  }

  render() {
    const {
      children,
      wrapped,
      addMore,
    } = this.props

    const childrenArray = Children.toArray(children)

    const cl = cx({
      [css.list]: true,
      [css.wrapped]: wrapped,
    })

    return (
      <ul className={cl}>
        {childrenArray.map(this.renderItem)}
        {addMore &&
          <li className={cx(css.item, css.addMore)}>
            {typeof addMore === 'boolean' ? 'and others' : addMore}
          </li>
        }
      </ul>
    )
  }
}
