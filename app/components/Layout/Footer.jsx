import React, {PureComponent} from 'react'
import Section from 'app/components/Layout/Section'
import LinkScramble from 'app/components/Elements/LinkScramble'
import Divider from 'app/components/Elements/Divider'
import css from './Footer.styl'
import Email from './Email'

export default class Footer extends PureComponent {
  static propTypes = {
  }

  render() {
    return (
      <Section element="footer" className={css.footer}>
        <Divider />
        <ul>
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
          <li>
            <Email />
          </li>
        </ul>
      </Section>
    )
  }
}
