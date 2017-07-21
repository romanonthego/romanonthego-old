import React, {PureComponent, PropTypes} from 'react'
import Section from 'app/components/Layout/Section'
import ExternalLink from 'app/components/Elements/ExternalLink'
import LoadingBar from 'app/components/Layout/LoadingBar'
// import cx from 'classnames'
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
          <span className={css.statusText}>
            {loading ? 'loading' : 'loaded'}
          </span>

          <LoadingBar loading={loading} />
        </main>

        <ul className={css.meta}>
          <li className>
            v{version}
          </li>
          <li>
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
