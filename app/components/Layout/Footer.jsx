import React, {PureComponent} from 'react'
import Section from 'app/components/Layout/Section'
import LinkPrint from 'app/components/Elements/LinkPrint'
import Divider from 'app/components/Elements/Divider'
import css from './Footer.styl'
import Email from './Email'

export default class Footer extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <Section component="footer" className={css.footer}>
        <Divider />
        <main className={css.navigations}>
          <ul>
            <li className={css.resumeLink}>
              <LinkPrint to="/resume">/resume</LinkPrint>
            </li>
            <li className={css.resumeLink}>
              <LinkPrint to="/playground">/playground</LinkPrint>
            </li>
          </ul>

          <ul className={css.socialLinks}>
            <li>
              <Email />
            </li>
            <li>
              <LinkPrint
                to="https://github.com/romanonthego"
                data-tooltip-position="top"
              >
                github
              </LinkPrint>
            </li>
            <li>
              <LinkPrint
                to="https://medium.com/@romanonthego"
                data-tooltip-position="top"
              >
                medium
              </LinkPrint>
            </li>
            <li>
              <LinkPrint
                to="https://www.facebook.com/romanonthego"
                data-tooltip-position="top"
              >
                facebook
              </LinkPrint>
            </li>
          </ul>
        </main>
      </Section>
    )
  }
}
