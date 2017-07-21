import React, {PureComponent, PropTypes, Children} from 'react'
import LinkScramble from 'app/components/Elements/LinkScramble'
import cx from 'classnames'
import css from './BreadCrumbs.styl'

export default class BreadCrumbs extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
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
    } = this.props

    const childrenArray = Children.toArray(children)

    return (
      <nav className={css.breadcrumbs}>
        <ul>
          <li className={cx(css.item, css.root)}>
            <LinkScramble to="/">
              romanonthego
            </LinkScramble>
          </li>
          {childrenArray.map(this.renderItem)}
        </ul>
      </nav>
    )
  }
}
