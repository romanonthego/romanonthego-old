import React, {PureComponent} from 'react'
// import PropTypes from 'prop-types'
import {Link} from 'react-router'
import PageMeta from 'app/components/PageMeta'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import TextPrint from 'app/components/Elements/TextPrint'
import css from './ErrorPages.styl'

export default class NotFoundPage extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <PageMeta status={404}>
        <SiteWrap colorKey="white">
          <Section className={css.section} paddingTop paddingBottom>
            <section className={css.content}>
              <main>
                <h1 className={css.title}>404</h1>
                <TextPrint className="secondary">Page not found</TextPrint>
              </main>
              <aside>
                <Link to="/">Back to /index</Link>
              </aside>
            </section>
          </Section>
        </SiteWrap>
      </PageMeta>
    )
  }
}
