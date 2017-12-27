import {connect} from 'react-redux'
import ControlPanel from './index'

const mapStateToProps = ({loadingBar}) => ({
  loading: loadingBar.shown,
  version: GLOBALS.VERSION,
  commitLong: GLOBALS.GIT_COMMIT_LONG,
  commitShort: GLOBALS.GIT_COMMIT_SHORT,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
