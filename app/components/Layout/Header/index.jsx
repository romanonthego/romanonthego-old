import React, {PureComponent} from 'react'
// import PropTypes from 'prop-types'
import {ChevronDown, User, Search} from 'react-feather'
import {Link} from 'react-router'
// import cx from 'classnames'
import css from './index.styl'

export default class Header extends PureComponent {
  static propTypes = {
    // children: PropTypes.node.isRequired,
  }

  // static defaultProps = {
  //
  // }

  // state = {
  //
  // }

  render() {
    return (
      <header className={css.header}>
        <nav className={css.mainNav}>
          <ul>
            <li>
              <Link to="/">romanonthego.rocks</Link>
            </li>
          </ul>
        </nav>
        <nav className={css.secondaryNav}>
          <ul>
            <li>
              <User />
            </li>
            <li>
              <Search />
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}
