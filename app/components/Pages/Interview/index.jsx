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

console.log(paths)

export default class InterviewPage extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <SiteWrap displayHeader={false} displayFooter>
        <Helmet
          url={`${GLOBALS.BASE_URL}/interview/`}
          title="Interview"
          description="Interview"
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
            <p className="secondary">interview preparations</p>
          </BreadCrumbs>
        </Section>
        <Section>
          <TextScramble className={css.title} component="h1">
            Interview Preparations
          </TextScramble>

          <Library demos={paths} />
        </Section>
      </SiteWrap>
    )
  }
}
