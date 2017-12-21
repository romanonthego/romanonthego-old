import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import cx from 'classnames'
import Header from './Header'
import Footer from './Footer'
import css from './SiteWrap.styl'

export default class SiteWrap extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    displayHeader: PropTypes.bool,
    displayFooter: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    displayHeader: true,
    displayFooter: true,
  }

  render() {
    const {children, displayHeader, displayFooter, className} = this.props

    const cl = cx({
      [css.site]: true,
      [className]: className,
    })

    return (
      <main className={cl}>
        <main className={css.wrapper}>
          {displayHeader && <Header />}

          <main className={css.contentWrap}>{children}</main>

          {displayFooter && <Footer />}
        </main>
      </main>
    )
  }
}
