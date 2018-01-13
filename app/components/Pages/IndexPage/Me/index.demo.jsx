import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Demo from 'app/components/Elements/PlaygroundLibrary/ComponentDemo'
import DemoProps from 'app/components/Elements/PlaygroundLibrary/ComponentDemo/props'
import TextPrint from 'app/components/Elements/TextPrint'
import TextScramble from 'app/components/Elements/TextScramble'
import LinkScramble from 'app/components/Elements/LinkScramble'
import Component from './index'

const importMePaths = () =>
  import(/* webpackChunkName: 'me-paths' */
  /* webpackMode: 'lazy' */
  './paths')

class Target extends PureComponent {
  static propTypes = {
    useMouseTracking: PropTypes.bool,
  }

  state = {
    paths: null,
  }
  componentDidMount() {
    importMePaths().then(paths => this.setState({paths}))
  }

  render() {
    const {useMouseTracking} = this.props
    const {paths} = this.state

    return (
      <Component paths={paths} staticMe useMouseTracking={useMouseTracking} />
    )
  }
}

export default (
  <Demo
    background="dark"
    props={{
      useMouseTracking: DemoProps.bool(false),
    }}
  >
    {props => <Target {...props} />}
  </Demo>
)

export const location = [
  'ReactComponents',
  'SiteComponents',
  'InteractivePortrait',
]
export const description = (
  <React.Fragment>
    <TextScramble component="h1">Interactive Portrait</TextScramble>
    <TextPrint component="p">
      Interactive portrait for main page. Constructed from svg paths with
      react-motion.
    </TextPrint>
  </React.Fragment>
)
