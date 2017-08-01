import React, {PureComponent} from 'react'
import BulletproofHelmet from 'bulletproof-react-helmet-es6'
import TextScramble from 'app/components/Elements/TextScramble'
import LinkScramble from 'app/components/Elements/LinkScramble'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import BreadCrumbs from 'app/components/Layout/BreadCrumbs'
// import cx from 'classnames'
import css from './index.styl'

export default class TextScrambleDemo extends PureComponent {
  static propTypes = {
  }

  state = {
    text: 'hello world',
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({
      text: this.input.value,
    })
  }

  render() {
    const {
      text,
    } = this.state

    return (
      <SiteWrap>
        <BulletproofHelmet
          url={`${GLOBALS.BASE_URL}/playground/text-scramble/`}
          title="TextScramble Demo"
          description="Litlle text scramble effect as pureres react component"
          breadcrumbs={[
            {
              id: `${GLOBALS.BASE_URL}`,
              name: 'romanonthego',
            },
            {
              id: `${GLOBALS.BASE_URL}/playground/`,
              name: 'playground',
            },
            {
              id: `${GLOBALS.BASE_URL}/playground/text-scramble/`,
              name: 'TextScramble',
            },
          ]}
        />
        <Section>
          <BreadCrumbs>
            <LinkScramble to="/playground/">
              playground
            </LinkScramble>
          </BreadCrumbs>
        </Section>
        <Section>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <input
                type="text"
                defaultValue={'well, hello'}
                ref={(input) => this.input = input} // eslint-disable-line
                autoFocus // eslint-disable-line
              />
              <button type="submit">
                apply text
              </button>
            </fieldset>
          </form>
        </Section>

        <Section>
          <main className={css.demo}>
            <TextScramble element="h1" className={css.demoText}>
              {text}
            </TextScramble>
          </main>
        </Section>

        <Section>
          <TextScramble element="h1">
            Text Scramble
          </TextScramble>
          <TextScramble element="p">
            React pure component for text scramble effect.
          </TextScramble>
          <TextScramble element="p">
            Highly effective, only render what it absolutly needs to.
          </TextScramble>
          <TextScramble element="p">
            Utilises `requestAnimationFrame` under the hood.
          </TextScramble>
          <TextScramble>
            Reworked to react component from <LinkScramble to="https://codepen.io/soulwire/pen/mErPAK">Text Scramble Effect codepen</LinkScramble>
          </TextScramble>
        </Section>
      </SiteWrap>
    )
  }
}
