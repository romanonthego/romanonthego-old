import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import PageMeta from 'app/components/PageMeta'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import TextPrint from 'app/components/Elements/TextPrint'
import window from 'app/utils/window'
import css from './ErrorPages.styl'

export default class ServerErrorPage extends PureComponent {
  static propTypes = {
    error: PropTypes.object,
  }

  static defaultProps = {}

  render() {
    const {
      error,
      // skipLayout,
    } = this.props

    const displayError = error

    return (
      <PageMeta status={500}>
        <SiteWrap colorKey="white">
          <Section className={css.content}>
            <main>
              <h1 className={css.title}>500</h1>
              <p className="secondary">Something went wrong</p>
            </main>
            <aside>
              <button onClick={() => window.location.reload()}>
                reload page
              </button>
            </aside>
          </Section>
          <Section className={css.section} paddingTop paddingBottom>
            {displayError && (
              <code className={css.errorStack}>
                Message: {error.message}
                <br />
                <br />
                {error.stack}
              </code>
            )}
          </Section>
        </SiteWrap>
      </PageMeta>
    )
  }
}
