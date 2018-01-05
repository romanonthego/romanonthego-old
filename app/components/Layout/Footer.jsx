import React, {PureComponent} from 'react'
import Section from 'app/components/Layout/Section'
import LinkScramble from 'app/components/Elements/LinkScramble'
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
              <LinkScramble to="/resume">/resume</LinkScramble>
            </li>
            <li className={css.resumeLink}>
              <LinkScramble to="/playground">/playground</LinkScramble>
            </li>
          </ul>

          <ul className={css.socialLinks}>
            <li>
              <Email />
            </li>
            <li>
              <LinkScramble
                to="https://github.com/romanonthego"
                data-tooltip-position="top"
              >
                github
              </LinkScramble>
            </li>
            <li>
              <LinkScramble
                to="https://medium.com/@romanonthego"
                data-tooltip-position="top"
              >
                medium
              </LinkScramble>
            </li>
            <li>
              <LinkScramble
                to="https://www.facebook.com/romanonthego"
                data-tooltip-position="top"
              >
                facebook
              </LinkScramble>
            </li>
          </ul>
        </main>
      </Section>
    )
  }
}
