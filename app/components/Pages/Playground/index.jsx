import React, {PureComponent} from 'react'
import Helmet from 'app/components/Helmet'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import TextScramble from 'app/components/Elements/TextScramble'
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
          url={`${GLOBALS.BASE_URL}/playground/`}
          title="Playground"
          description="Litlle playground of mine"
          breadcrumbs={[
            {
              id: `${GLOBALS.BASE_URL}`,
              name: 'romanonthego',
            },
            {
              id: `${GLOBALS.BASE_URL}/playground/`,
              name: 'playground',
            },
          ]}
        />
        <Section>
          <BreadCrumbs>
            <p className="secondary">playground</p>
          </BreadCrumbs>
        </Section>
        <Section className={css.section}>
          <TextScramble className={css.title} component="h1">
            Playground
          </TextScramble>
          <main>
            <TextScramble
              className={css.description}
              onDone={this.handleNextStep}
            >
              Litlle playground of mine
            </TextScramble>
          </main>
          <main className={css.block}>
            <LinksList>
              <LinkScramble to="/playground/text-scramble/">
                TextScramble
              </LinkScramble>
              <LinkScramble to="/playground/text-print/">
                TextPrint
              </LinkScramble>
            </LinksList>
          </main>
        </Section>
      </SiteWrap>
    )
  }
}
