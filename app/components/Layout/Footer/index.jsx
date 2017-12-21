import React, {PureComponent} from 'react'
// import cx from 'classnames'
import css from './index.styl'

export default class Footer extends PureComponent {
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
      <footer className={css.footer}>
        <nav className={css.mainNav}>
          <ul className={css.mainList} />
          <ul className={css.secondaryList} />
        </nav>
      </footer>
    )
  }
}
