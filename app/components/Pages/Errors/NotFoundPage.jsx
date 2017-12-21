import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
// import {Link} from 'react-router/es'
import PageMeta from 'app/components/PageMeta'
import Wrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
// import cx from 'classnames'
import css from './NotFoundPage.styl'

export default class NotFoundPage extends PureComponent {
  static propTypes = {
    t: PropTypes.func,
  }

  render() {
    return (
      <PageMeta status={404}>
        <Wrap>
          <Section
            colorKey="transparent"
            className={css.innerSection}
            sectionClassName={css.section}
          >
            <div className={css.wrapper}>
              <h2 className={css.title} />
              <p className={css.subtitle} />
            </div>
          </Section>
        </Wrap>
      </PageMeta>
    )
  }
}
