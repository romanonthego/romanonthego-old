import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import PageMeta from 'app/components/PageMeta'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import window from 'app/utils/window'
import css from './ErrorPages.styl'

export default class ServerErrorPage extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    error: PropTypes.object,
    skipLayout: PropTypes.bool,
  }

  static defaultProps = {
    skipLayout: false,
  }


  render() {
    const {
      error,
      // skipLayout,
    } = this.props

    const displayError = error

    return (
      <PageMeta status={500}>
        <SiteWrap colorKey="white" displayFooter={false}>
          <Section className={css.content}>
            <main>
              <p>
                Somenthing went wrong
              </p>
            </main>
            <aside>
              <button onClick={() => window.location.reload()}>
                Reload
              </button>
            </aside>
          </Section>
          <Section className={css.section} paddedVertical>

            {displayError &&
              <code className={css.errorStack}>
                Message: {error.message}
                <br />
                <br />
                {error.stack}
              </code>
            }
          </Section>
        </SiteWrap>
      </PageMeta>
    )
  }
}
