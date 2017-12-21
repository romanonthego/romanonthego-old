import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import PageMeta from 'app/components/PageMeta'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import reportError from 'app/utils/reporting'
import css from './ErrorPages.styl'

export default class ServerErrorPage extends PureComponent {
  static propTypes = {
    error: PropTypes.object,
    skipLayout: PropTypes.bool,
  }

  static defaultProps = {
    skipLayout: false,
  }

  componentWillMount() {
    reportError(this.props.error, {
      extra: {message: 'user saw a 500 error page'},
    })
  }

  render() {
    const {error, skipLayout} = this.props

    const displayError = error

    return (
      <PageMeta status={500}>
        <SiteWrap displayHeader={!skipLayout} displayFooter={!skipLayout}>
          <Section className={css.content}>
            <h1 className={css.title}>Что-то пошло не так</h1>
            <h2 className={css.subtitle}>
              Попробуйте повторить позже. Мы уже работаем над решением проблемы.
            </h2>
          </Section>
          <Section className={css.section}>
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
