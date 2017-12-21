import React, {PureComponent} from 'react'
import SiteWrap from 'app/components/Layout/SiteWrap'
// import cx from 'classnames'
// import css from './index.styl'

export default class IndexPage extends PureComponent {
  static propTypes = {
    // children: PropTypes.node.isRequired,
  }

  // static defaultProps = {
  //
  // }

  // state = {
  //
  // }

  render() {
    return (
      <SiteWrap>
        <div>Main page</div>
      </SiteWrap>
    )
  }
}
