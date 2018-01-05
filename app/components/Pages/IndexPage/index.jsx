import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Helmet from 'app/components/Helmet'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import TextScramble from 'app/components/Elements/TextScramble'
import TextPrint from 'app/components/Elements/TextPrint'
import LinkScramble from 'app/components/Elements/LinkScramble'
import SubTitle from 'app/components/Elements/SubTitle'
import LinksList from 'app/components/Elements/LinksList'
import css from './index.styl'
import Me from './Me'

const importMePaths = () =>
  import(/* webpackChunkName: 'me-paths' */
  /* webpackMode: 'lazy' */
  './Me/paths')

const alreadyVisitedTimeout = 100
const defaultTimeout = 200

export default class IndexPage extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    alreadyVisited: PropTypes.bool.isRequired,
    setAlreadyVisited: PropTypes.func.isRequired,
  }

  static defaultProps = {
    alreadyVisited: true,
  }

  state = {
    step: 0,
    paths: null,
    useReducedMotion: false,
  }

  componentDidMount() {
    if (!this.props.loading) {
      this.handleStart()
    }

    importMePaths().then(paths => {
      let useReducedMotion = false

      // if (window.matchMedia && window.matchMedia('(prefers-reduced-motion)')) {
      //   useReducedMotion = true
      // }

      this.setState({paths, useReducedMotion})
    })
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.loading && this.state.step === 0) {
      this.handleStart()
    }
  }

  componentDidUpdate() {
    const {setAlreadyVisited, alreadyVisited} = this.props

    const {step} = this.state

    if (step >= 6 && !alreadyVisited) {
      setAlreadyVisited(true)
    }
  }

  handleStart = () => this.setState({step: 1})

  handleNextStep = () => {
    this.setState({step: this.state.step + 1})
  }

  shouldRender = (step, useFastMode = true) => {
    return this.state.step > step
  }

  render() {
    const {alreadyVisited} = this.props

    const {paths, useReducedMotion} = this.state

    return (
      <SiteWrap displayHeader={false} displayFooter={this.shouldRender(6)}>
        <Helmet
          title="romanonthego"
          description="Hello there, I’m Roman Dubinin, front-end developer"
          breadcrumbs={[
            {
              id: `${GLOBALS.BASE_URL}`,
              name: 'romanonthego',
            },
          ]}
        />
        <Section className={css.section}>
          <main className={css.content}>
            <TextScramble
              className={css.title}
              component="h1"
              onDone={this.handleNextStep}
              onDoneTimeout={
                alreadyVisited ? alreadyVisitedTimeout * 4 : defaultTimeout * 4
              }
            >
              {this.shouldRender(1) ? `Hello there` : 'Oh'}
            </TextScramble>

            {this.shouldRender(2) && (
              <main>
                <TextScramble
                  className={css.description}
                  onDone={this.handleNextStep}
                  onDoneTimeout={
                    alreadyVisited ? alreadyVisitedTimeout : defaultTimeout
                  }
                >
                  I’m Roman Dubinin, front-end developer
                </TextScramble>
                <br />
                <div className="secondary">
                  <TextPrint component="p">
                    Enjoying building universal applications with
                  </TextPrint>
                  <LinkScramble to="https://facebook.github.io/react/">
                    React
                  </LinkScramble>,{' '}
                  <LinkScramble to="https://webpack.js.org/">
                    Webpack
                  </LinkScramble>,{' '}
                  <LinkScramble to="https://nodejs.org/">Node.js</LinkScramble>,{' '}
                  {' '}
                  <TextPrint component="span">
                    and optimizing max out of it.
                  </TextPrint>
                </div>
              </main>
            )}

            {this.shouldRender(3) && (
              <main className={css.block}>
                <SubTitle>
                  <TextScramble
                    onDone={this.handleNextStep}
                    onDoneTimeout={
                      alreadyVisited ? alreadyVisitedTimeout : defaultTimeout
                    }
                    component="span"
                  >
                    Playground
                  </TextScramble>
                </SubTitle>
                <TextPrint
                  component="p"
                  className={cx('secondary', css.description)}
                >
                  Interactive demos of components, concepts etc:
                </TextPrint>
                <LinksList
                  wrapped
                  addMore="explore more"
                  moreLink="/playground"
                >
                  <LinkScramble to="/playground#!/ReactComponents/SiteComponents/TextScramble/">
                    TextScramble
                  </LinkScramble>

                  <LinkScramble to="/playground#!/ReactComponents/SiteComponents/TextPrint/">
                    TextPrint
                  </LinkScramble>

                  <LinkScramble to="/playground#!/ReactComponents/SiteComponents/InteractivePortrait/">
                    InteractivePortrait
                  </LinkScramble>

                  <LinkScramble to="/playground#!/ReactComponents/Fractals/PythogorasTree/">
                    PythagorasTree
                  </LinkScramble>

                  <LinkScramble to="/playground#!/ReactComponents/CellularAutomata/GameOfLife/">
                    GameOfLife
                  </LinkScramble>
                </LinksList>
              </main>
            )}

            {this.shouldRender(4) && (
              <main className={css.block}>
                <SubTitle>
                  <TextScramble
                    component="span"
                    onDone={this.handleNextStep}
                    onDoneTimeout={
                      alreadyVisited ? alreadyVisitedTimeout : defaultTimeout
                    }
                  >
                    Experience
                  </TextScramble>
                </SubTitle>

                <TextPrint
                  component="p"
                  className={cx('secondary', css.description)}
                >
                  Projects I’ve worked on and with:
                </TextPrint>

                <LinksList wrapped addMore>
                  <LinkScramble to="https://uploadcare.com">
                    uploadcare
                  </LinkScramble>

                  <LinkScramble to="https://riders.co">riders</LinkScramble>

                  <LinkScramble to="http://whitescape.com">
                    whitescape
                  </LinkScramble>

                  <LinkScramble to="http://vector.education">
                    vector
                  </LinkScramble>

                  <LinkScramble to="https://openuni.io">openuni</LinkScramble>

                  <LinkScramble to="https://lmbd.ru/">
                    lambada market
                  </LinkScramble>

                  <LinkScramble to="http://intel.afisha.ru/">
                    intel.afisha.ru
                  </LinkScramble>

                  <LinkScramble to="https://www.clickavia.ru">
                    clickavia
                  </LinkScramble>
                </LinksList>
              </main>
            )}

            {this.shouldRender(5) && (
              <main className={css.block}>
                <SubTitle>
                  <TextScramble
                    component="span"
                    onDone={this.handleNextStep}
                    onDoneTimeout={
                      alreadyVisited ? alreadyVisitedTimeout : defaultTimeout
                    }
                  >
                    Open Source
                  </TextScramble>
                </SubTitle>

                <LinksList
                  addMore="and more in github profile"
                  moreLink="https://github.com/romanonthego"
                >
                  <div>
                    <LinkScramble
                      to="https://github.com/whitescape/uploadcare-loader"
                      data-title="github.com/whitescape/uploadcare-loader"
                      data-use-title
                    >
                      uplodcare-loader
                    </LinkScramble>
                    <TextPrint component="p" className="secondary">
                      Webpack async loaders that store you static assets on CDN
                      and returns global cdn link with all the power of
                      Uploadcare CDN API
                    </TextPrint>
                  </div>
                  <div>
                    <LinkScramble
                      to="https://github.com/romanonthego/bulletproof-template"
                      data-title="github.com/romanonthego/bulletproof-template"
                      data-use-title
                    >
                      bulletproof-template
                    </LinkScramble>
                    <TextPrint component="p" className="secondary">
                      Our very own webpack3/react/redux boilerplate with
                      hot-reloading, server (!) hot-reloading, and SSR, written
                      entirely in es6 (yes, even webpack config and Node.js
                      code)
                    </TextPrint>
                  </div>
                  <div>
                    <LinkScramble
                      to="https://github.com/romanonthego/bulletproof-react-helmet-es6"
                      data-title="github.com/romanonthego/bulletproof-react-helmet-es6"
                      data-use-title
                    >
                      bulletproof-react-helmet
                    </LinkScramble>
                    <TextPrint component="p" className="secondary">
                      Set of utils and wrappers around react-helmet to cover
                      everyday use-cases: social share, images, favicons and
                      schema.org graphs used by Google
                    </TextPrint>
                  </div>
                  <div>
                    <LinkScramble
                      to="https://github.com/romanonthego/react-swipeable-views-es6"
                      data-title="github.com/romanonthego/react-swipeable-views-es6"
                      data-use-title
                    >
                      react-swipeable-views
                    </LinkScramble>
                    <TextPrint component="p" className="secondary">
                      Fork of react-swipeable-views with es6 code only and
                      support for custom animation during transitions
                    </TextPrint>
                  </div>
                </LinksList>
              </main>
            )}

            {this.shouldRender(6) && (
              <main className={css.block}>
                <SubTitle>
                  <TextScramble
                    onDone={this.handleNextStep}
                    onDoneTimeout={
                      alreadyVisited ? alreadyVisitedTimeout : defaultTimeout
                    }
                    component="span"
                  >
                    Articles
                  </TextScramble>
                </SubTitle>
                <LinksList>
                  <div>
                    <LinkScramble
                      to="https://blog.uploadcare.com/supercharge-your-static-assets-with-uploadcare-and-webpack-in-no-time-a7f1f0b5b30a#.mqdm5trmr"
                      data-title="https://blog.uploadcare.com/"
                      data-use-title
                    >
                      Supercharge your static assets with Uploadcare and Webpack
                    </LinkScramble>
                    <TextPrint className="secondary" component="p">
                      How can one use Uploadcare and Webpack to get all the
                      power of the CDN applied to static graphic assets
                    </TextPrint>
                  </div>
                  <div>
                    <LinkScramble
                      to="https://medium.com/@romanonthego/firebase-js-is-so-damn-huge-f04de528094f"
                      data-title="https://medium.com/@romanonthego"
                      data-use-title
                    >
                      firebase.js is SO DAMN HUGE!
                    </LinkScramble>
                    <TextPrint className="secondary" component="p">
                      How can firebase be extracted from vendor bundle and lazy
                      loaded since it is SO DAMN HUGE? Seriously, it is 107kb
                      gzipped!
                    </TextPrint>
                    <LinkScramble
                      to="https://habrahabr.ru/post/344248/"
                      className="secondary"
                    >
                      (russian version on habrahabr)
                    </LinkScramble>
                  </div>
                </LinksList>
              </main>
            )}
          </main>

          <aside className={css.me}>
            {this.shouldRender(alreadyVisited ? 6 : 7, false) &&
              paths && <Me paths={paths} mouseMovement={!useReducedMotion} />}
          </aside>
        </Section>
      </SiteWrap>
    )
  }
}
