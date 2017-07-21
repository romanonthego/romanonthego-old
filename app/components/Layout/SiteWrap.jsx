import React, {PureComponent} from 'react'
import cx from 'classnames'
import css from './SiteWrap.styl'
import Header from './Header'
import Footer from './Footer'

export default class SiteWrap extends PureComponent {
  static propTypes = {
    children: React.PropTypes.node,
    displayHeader: React.PropTypes.bool,
    displayFooter: React.PropTypes.bool,
    displayProfile: React.PropTypes.bool,
  }

  static defaultProps = {
    displayHeader: false,
    displayFooter: true,
  }

  render() {
    const {
      children,
      displayHeader,
      displayFooter,
    } = this.props

    const cl = cx({
      [css.site]: true,
    })

    return (
      <main className={cl}>
        <aside className={css.overlay} />

        {displayHeader &&
          <Header />
        }

        <main className={css.siteWrap}>
          {children}
        </main>

        {displayFooter &&
          <Footer />
        }
      </main>
    )
  }
}
