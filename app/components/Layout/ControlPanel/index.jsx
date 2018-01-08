import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Section from 'app/components/Layout/Section'
import ExternalLink from 'app/components/Elements/ExternalLink'
import LoadingBar from 'app/components/Layout/LoadingBar'
import TextPrint from 'app/components/Elements/TextPrint'
import css from './index.styl'

export default class ControlPanel extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    version: PropTypes.string.isRequired,
    commitLong: PropTypes.string.isRequired,
    commitShort: PropTypes.string.isRequired,
  }

  static defaultProps = {
    loading: false,
  }

  render() {
    const {loading, version, commitLong, commitShort} = this.props

    return (
      <Section component="nav" paddingBottom={false} className={css.wrap}>
        <main className={css.status}>
          <TextPrint className={css.statusText}>
            {loading ? 'loading' : 'loaded'}
          </TextPrint>

          <LoadingBar loading={loading} />
        </main>

        <ul className={css.meta}>
          <li className={css.version}>v{version}</li>
          <li>
            <span className={css.sourceTitle}>source: </span>
            <ExternalLink
              to={`https://github.com/romanonthego/romanonthego/commit/${commitLong}`}
              data-hide-tooltip
            >
              #{commitShort}
            </ExternalLink>
          </li>
        </ul>
      </Section>
    )
  }
}
