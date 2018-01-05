import React, {PureComponent} from 'react'
import Helmet from 'app/components/Helmet'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import TextScramble from 'app/components/Elements/TextScramble'
import TextPrint from 'app/components/Elements/TextPrint'
import LinkScramble from 'app/components/Elements/LinkScramble'
import BreadCrumbs from 'app/components/Layout/BreadCrumbs'
import LinksList from 'app/components/Elements/LinksList'
import Library from 'app/components/Elements/DemoLibrary/Library'
import paths from './paths'
import css from './index.styl'

export default class PlaygroundPage extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <SiteWrap displayHeader={false} displayFooter>
        <Helmet
          url={`${GLOBALS.BASE_URL}/playground/`}
          title="Playground"
          description="Playground"
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
        <Section>
          <TextScramble className={css.title} component="h1">
            Playground
          </TextScramble>
          <TextPrint component="span" className="secondary">
            Little Playground of mine, displays demos of Components used on this
            site.
          </TextPrint>
          <br />
          <TextPrint component="span" className="secondary">
            Based on and inspired by
          </TextPrint>{' '}
          <LinkScramble to="https://github.com/rpominov/react-demo-library">
            react-demo-library
          </LinkScramble>
        </Section>
        <Section paddingTop={false}>
          <Library demos={paths} />
        </Section>
      </SiteWrap>
    )
  }
}
