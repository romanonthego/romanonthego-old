import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Section from 'app/components/Layout/Section'
import ExternalLink from 'app/components/Elements/ExternalLink'
import LoadingBar from 'app/components/Layout/LoadingBar'
import TextScramble from 'app/components/Elements/TextScramble'
import css from './ControlPanel.styl'

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
    const {
      loading,
      version,
      commitLong,
      commitShort,
    } = this.props

    return (
      <Section element="nav" paddingBottom={false} className={css.wrap}>
        <main className={css.status}>
          <TextScramble className={css.statusText}>
            {loading ? 'loading' : 'loaded'}
          </TextScramble>

          <LoadingBar loading={loading} />
        </main>

        <ul className={css.meta}>
          <li className>
            v{version}
          </li>
          <li>
            source: <ExternalLink
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
