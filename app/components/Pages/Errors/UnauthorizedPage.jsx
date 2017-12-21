import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {Link} from 'react-router/es'
import PageMeta from 'app/components/PageMeta'
import Wrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import css from './ErrorPages.styl'

export default class UnauthorizedPage extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <PageMeta status={403}>
        <Wrap>
          <Section className={css.section}>
            <h1 className={css.title}>У вас нет доступа к этой странице</h1>
            <h2 className={css.subtitle}>
              Но вы можете венуться на <Link to="/">главную страницу</Link>
            </h2>
          </Section>
        </Wrap>
      </PageMeta>
    )
  }
}
