import {connect} from 'react-redux'
import ControlPanel from './ControlPanel'

const mapStateToProps = ({loadingBar}) => ({
  loading: loadingBar === 1,
  version: GLOBALS.VERSION,
  commitLong: GLOBALS.LAST_COMMIT_LONG,
  commitShort: GLOBALS.LAST_COMMIT_SHORT,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel)
