import React, {PureComponent} from 'react'
import Helmet from 'app/components/Helmet'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import TextScramble from 'app/components/Elements/TextScramble'
import TextPrint from 'app/components/Elements/TextPrint'
import LinkScramble from 'app/components/Elements/LinkScramble'
import BreadCrumbs from 'app/components/Layout/BreadCrumbs'
import LinksList from 'app/components/Elements/LinksList'
// import cx from 'classnames'
import css from './index.styl'

export default class PlaygroundPage extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <SiteWrap displayHeader={false} displayFooter>
        <Helmet
          url={`${GLOBALS.BASE_URL}/resume/`}
          title="Resume"
          description="Roman Dubinin resume links"
          breadcrumbs={[
            {
              id: `${GLOBALS.BASE_URL}`,
              name: 'romanonthego',
            },
            {
              id: `${GLOBALS.BASE_URL}/resume/`,
              name: 'resume',
            },
          ]}
        />
        <Section>
          <BreadCrumbs>
            <p className="secondary">resume</p>
          </BreadCrumbs>
        </Section>
        <Section>
          <TextScramble className={css.title} component="h1">
            Resume
          </TextScramble>

          <TextPrint component="p" className="secondary">
            As I’m grow tired of copy-pasting link to my resume and
            redownloading the PDF,
          </TextPrint>
          <TextPrint component="p" className="secondary">
            I’ve desided to just put it here. It will always be up to date
            (thanks, Google Docs)
          </TextPrint>

          <main className={css.block}>
            <LinksList>
              <LinkScramble to="https://goo.gl/x8wd2h">
                docs.google document
              </LinkScramble>
              <LinkScramble to="https://goo.gl/Ypmfjn">
                download PDF file
              </LinkScramble>
              <LinkScramble to="https://goo.gl/Mcj2EN">
                download RTF file
              </LinkScramble>
            </LinksList>
          </main>

          <iframe
            className={css.resumeIframe}
            scrolling="yes"
            src="https://docs.google.com/document/d/e/2PACX-1vTYUF1_YbmrjAEjPll36cNAEfs0boV6dclZsBHXWtNxDfEzud_yx-Uj_Ko-n7zcghdQZ0gxRuacw_IU/pub?embedded=true"
          />
        </Section>
      </SiteWrap>
    )
  }
}
