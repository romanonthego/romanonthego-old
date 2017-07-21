import React, {PureComponent, PropTypes} from 'react'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import TextScramble from 'app/components/Elements/TextScramble'
import LinkScramble from 'app/components/Elements/LinkScramble'
import SubTitle from 'app/components/Elements/SubTitle'
import LinksList from 'app/components/Elements/LinksList'
import css from './index.styl'
import Me from './Me'

export default class IndexPage extends PureComponent {
  static propTypes = {
    loading: PropTypes.number.isRequired,
    fastMode: PropTypes.bool.isRequired,
    setFastMode: PropTypes.func.isRequired,
  }

  static defaultProps = {
    fastMode: true,
  }

  state = {
    step: 0,
  }

  componentDidMount() {
    if (this.props.loading === 0) {
      this.handleStart()
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loading === 0 && this.state.step === 0) {
      this.handleStart()
    }
  }

  componentDidUpdate() {
    const {
      setFastMode,
      fastMode,
    } = this.props

    const {
      step,
    } = this.state

    if (step >= 6 && !fastMode) {
      setFastMode(true)
    }
  }

  handleStart = () => {
    this.setState({
      step: 1,
    })
  }

  handleNextStep = () => {
    this.setState({
      step: this.state.step + 1,
    })
  }

  shouldRender = (step, useFastMode = true) => {
    return this.state.step > step || (this.props.fastMode && useFastMode)
  }

  render() {
    const {
      fastMode,
    } = this.props

    return (
      <SiteWrap displayHeader={false} displayFooter={this.shouldRender(6)}>
        <Section className={css.section}>
          <TextScramble
            className={css.title}
            element="h1"
            onDone={this.handleNextStep}
            onDoneTimeout={800}
          >
            {this.shouldRender(1) ? 'Hello there' : 'Oh'}
          </TextScramble>

          {this.shouldRender(2) && (
            <main>
              <TextScramble
                className={css.description}
                onDone={this.handleNextStep}
              >
                I'm Roman Dubinin, front-end developer.
              </TextScramble>
              <TextScramble element="p">
                Working with <LinkScramble to="https://facebook.github.io/react/">React</LinkScramble>, <LinkScramble to="https://webpack.js.org/">Webpack</LinkScramble>, <LinkScramble to="https://nodejs.org/">Node</LinkScramble> and other stuff.
              </TextScramble>
            </main>
          )}

          {this.shouldRender(3) && (
            <main className={css.block}>
              <SubTitle>
                <TextScramble element="span" onDone={this.handleNextStep}>
                  Experience
                </TextScramble>
              </SubTitle>

              <LinksList wrapped addMore>
                <LinkScramble to="http://whitescape.com">
                  whitescape
                </LinkScramble>
                <LinkScramble to="http://vector.education">
                  vector
                </LinkScramble>
                <LinkScramble to="https://openuni.io">
                  openuni
                </LinkScramble>
                <LinkScramble to="https://lmbd.ru/">
                  lambada market
                </LinkScramble>
                <LinkScramble to="http://intel.afisha.ru/">
                  intel for afisha.ru
                </LinkScramble>
                <LinkScramble to="https://www.clickavia.ru">
                  clickavia
                </LinkScramble>
              </LinksList>
            </main>
          )}

          {this.shouldRender(4) && (
            <main className={css.block}>
              <SubTitle>
                <TextScramble element="span" onDone={this.handleNextStep}>
                  Open Source
                </TextScramble>
              </SubTitle>

              <LinksList>
                <LinkScramble
                  to="https://github.com/whitescape/uploadcare-loader"
                  data-title="github.com/whitescape/uploadcare-loader"
                  data-use-title
                >
                  uplodcare-loader
                </LinkScramble>
                <LinkScramble
                  to="https://github.com/romanonthego/bulletproof-template"
                  data-title="github.com/romanonthego/bulletproof-template"
                  data-use-title
                >
                  bulletproof-template
                </LinkScramble>
                <LinkScramble
                  to="https://github.com/romanonthego/bulletproof-react-helmet-es6"
                  data-title="github.com/romanonthego/bulletproof-react-helmet-es6"
                  data-use-title
                >
                  bulletproof-react-helmet
                </LinkScramble>
                <LinkScramble
                  to="https://github.com/romanonthego/react-swipeable-views-es6"
                  data-title="github.com/romanonthego/react-swipeable-views-es6"
                  data-use-title
                >
                  react-swipeable-views
                </LinkScramble>
              </LinksList>
            </main>
          )}

          {this.shouldRender(5) && (
            <main className={css.block}>
              <SubTitle>
                <TextScramble onDone={this.handleNextStep} element="span">
                  Articles
                </TextScramble>
              </SubTitle>
              <LinksList>
                <LinkScramble
                  to="https://blog.uploadcare.com/supercharge-your-static-assets-with-uploadcare-and-webpack-in-no-time-a7f1f0b5b30a#.mqdm5trmr"
                  data-title="https://blog.uploadcare.com/"
                  data-use-title
                >
                  uploadcare-loader
                </LinkScramble>
                <LinkScramble
                  to="https://medium.com/@romanonthego/firebase-js-is-so-damn-huge-f04de528094f"
                  data-title="https://medium.com/@romanonthego"
                  data-use-title
                >
                  firebase.js is huge and what can we do about it
                </LinkScramble>
              </LinksList>
            </main>
          )}

          {this.shouldRender(6) && (
            <main className={css.block}>
              <SubTitle>
                <TextScramble onDone={this.handleNextStep} element="span">
                  Playground
                </TextScramble>
              </SubTitle>
              <LinksList addMore="more to come">
                <LinkScramble to="/playground/text-scramble/">
                  TextScramble
                </LinkScramble>
              </LinksList>
            </main>
          )}

          {this.shouldRender(fastMode ? 6 : 7, false) && (
            <Me />
          )}
        </Section>
      </SiteWrap>
    )
  }
}
