import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import PageMeta from 'app/components/PageMeta'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import css from './ErrorPages.styl'

export default class NotFoundPage extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <PageMeta status={404}>
        <SiteWrap colorKey="white">
          <Section className={css.section} paddedVertical>
            <section className={css.content}>
              <main>
                <h1 className={css.title}>404</h1>
              </main>
              <aside>
                <Link to="/">
                  Back to /
                </Link>
              </aside>
            </section>
          </Section>
        </SiteWrap>
      </PageMeta>
    )
  }
}
