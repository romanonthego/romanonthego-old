import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
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
    loading: PropTypes.bool.isRequired,
    fastMode: PropTypes.bool.isRequired,
    setFastMode: PropTypes.func.isRequired,
  }

  static defaultProps = {
    fastMode: true,
  }

  state = {
    step: 0,
    paths: null,
  }

  componentDidMount() {
    if (!this.props.loading) {
      this.handleStart()
    }

    import(
      /* webpackChunkName: 'me-paths' */
      /* webpackMode: 'lazy' */
      './Me/paths'
    ).then((paths) => {
      this.setState({paths})
    })
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.loading && this.state.step === 0) {
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

    const {
      paths
    } = this.state

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
                I'm Roman Dubinin, lead front-end developer at
              </TextScramble> <LinkScramble to="http://whitescape.com">Whitescape</LinkScramble>.
              <br />
              <TextScramble>
                Enjoying building universal (a.k.a. isomorphic) applications with</TextScramble> <LinkScramble to="https://facebook.github.io/react/">React</LinkScramble>, <LinkScramble to="https://webpack.js.org/">Webpack</LinkScramble>, <LinkScramble to="https://nodejs.org/">Node.js</LinkScramble>
              <br />
              <TextScramble>
                and optimizing max out of it.
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
                <div>
                  <LinkScramble to="http://whitescape.com">
                    whitescape
                  </LinkScramble>
                </div>
                <div>
                  <LinkScramble to="http://vector.education">
                    vector
                  </LinkScramble>
                </div>
                <div>
                  <LinkScramble to="https://openuni.io">
                    openuni
                  </LinkScramble>
                </div>
                <div>
                  <LinkScramble to="https://lmbd.ru/">
                    lambada market
                  </LinkScramble>
                </div>
                <div>
                  <LinkScramble to="http://intel.afisha.ru/">
                    intel for afisha.ru
                  </LinkScramble>
                </div>
                <div>
                  <LinkScramble to="https://www.clickavia.ru">
                    clickavia
                  </LinkScramble>
                </div>
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
                <div>
                  <LinkScramble
                    to="https://github.com/whitescape/uploadcare-loader"
                    data-title="github.com/whitescape/uploadcare-loader"
                    data-use-title
                  >
                    uplodcare-loader
                  </LinkScramble>
                  <TextScramble element="p" className="secondary">
                    Webpack async loaders that store you static assets on CDN and returns global cdn link with all the power of Uploadcare CDN API
                  </TextScramble>
                </div>
                <div>
                  <LinkScramble
                    to="https://github.com/romanonthego/bulletproof-template"
                    data-title="github.com/romanonthego/bulletproof-template"
                    data-use-title
                  >
                    bulletproof-template
                  </LinkScramble>
                  <TextScramble element="p" className="secondary">
                    Our very own webpack3/react/redux boilerplate with hot-reloading, server (!) hot-reloading, and SSR, written entirely in es6 (yes, even webpack config and Node.js code)
                  </TextScramble>
                </div>
                <div>
                  <LinkScramble
                    to="https://github.com/romanonthego/bulletproof-react-helmet-es6"
                    data-title="github.com/romanonthego/bulletproof-react-helmet-es6"
                    data-use-title
                  >
                    bulletproof-react-helmet
                  </LinkScramble>
                  <TextScramble element="p" className="secondary">
                    Set of utils and wrappers around react-helmet to cover everyday use-cases: social share, images, favicons and schema.org graphs used by Google
                  </TextScramble>
                </div>
                <div>
                  <LinkScramble
                    to="https://github.com/romanonthego/react-swipeable-views-es6"
                    data-title="github.com/romanonthego/react-swipeable-views-es6"
                    data-use-title
                  >
                    react-swipeable-views
                  </LinkScramble>
                  <TextScramble element="p" className="secondary">
                    Fork of react-swipeable-views with es6 code only and support for custom animation during transitions
                  </TextScramble>
                </div>
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
              <LinksList addMore="and more in github profile">
                <div>
                  <LinkScramble
                    to="https://blog.uploadcare.com/supercharge-your-static-assets-with-uploadcare-and-webpack-in-no-time-a7f1f0b5b30a#.mqdm5trmr"
                    data-title="https://blog.uploadcare.com/"
                    data-use-title
                  >
                    Supercharge your static assets with Uploadcare and Webpack in no time
                  </LinkScramble>
                  <TextScramble className="secondary" element="p">
                    How can one use Uploadcare and Webpack to get all the power of the CDN applied to static graphic assets
                  </TextScramble>
                </div>
                <div>
                  <LinkScramble
                    to="https://medium.com/@romanonthego/firebase-js-is-so-damn-huge-f04de528094f"
                    data-title="https://medium.com/@romanonthego"
                    data-use-title
                  >
                    firebase.js is SO DAMN HUGE!
                  </LinkScramble>
                  <TextScramble className="secondary" element="p">
                    How can firebase be extracted from vendor bundle and lazy loaded since it is SO DAMN HUGE? Seriously, it is 107kb gzipped!
                  </TextScramble>
                </div>
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
                <div>
                  <LinkScramble to="/playground/text-scramble/">
                    TextScramble
                  </LinkScramble>
                  <TextScramble className="secondary" element="p">
                    Text scramble effect you could see on this site
                  </TextScramble>
                </div>
              </LinksList>
            </main>
          )}

          {(this.shouldRender(fastMode ? 6 : 7, false) && paths) &&
            <Me paths={paths} />
          }
        </Section>
      </SiteWrap>
    )
  }
}
