import React, {PureComponent, Children} from 'react'
import PropTypes from 'prop-types'
import LinkPrint from 'app/components/Elements/LinkPrint'
import cx from 'classnames'
import css from './BreadCrumbs.styl'

const renderItem = (child, i) => {
  return (
    <li key={i} className={css.item}>
      {child}
    </li>
  )
}

export default class BreadCrumbs extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const {children} = this.props

    const childrenArray = Children.toArray(children)

    return (
      <nav className={css.breadcrumbs}>
        <ul>
          <li className={cx(css.item, css.root)}>
            <LinkPrint to="/">romanonthego</LinkPrint>
          </li>
          {childrenArray.map(renderItem)}
        </ul>
      </nav>
    )
  }
}
