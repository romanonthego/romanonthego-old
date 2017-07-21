import React, {PureComponent} from 'react'
import BulletproofHelmet from 'bulletproof-react-helmet-es6'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import TextScramble from 'app/components/Elements/TextScramble'
import LinkScramble from 'app/components/Elements/LinkScramble'
import BreadCrumbs from 'app/components/Layout/BreadCrumbs'
import LinksList from 'app/components/Elements/LinksList'
// import cx from 'classnames'
import css from './index.styl'

export default class PlaygroundPage extends PureComponent {
  static propTypes = {
  }

  render() {
    return (
      <SiteWrap displayHeader={false} displayFooter>
        <BulletproofHelmet
          url={`${__BASE_URL__}/playground/`}
          title="Playground"
          description="Litlle playground of mine"
          breadcrumbs={[
            {
              id: `${__BASE_URL__}`,
              name: 'romanonthego',
            },
            {
              id: `${__BASE_URL__}/playground/`,
              name: 'playground',
            },
          ]}
        />
        <Section>
          <BreadCrumbs />
        </Section>
        <Section className={css.section}>
          <TextScramble className={css.title} element="h1">
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
            </LinksList>
          </main>
        </Section>
      </SiteWrap>

    )
  }
}
