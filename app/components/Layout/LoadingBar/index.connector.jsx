import {connect} from 'react-redux'
import {
  selectIsLoadingBarShown,
  selectIsLoadingBarWithError,
} from 'app/flux/selectors/loadingBar'
import LoadingBar from './index'

const mapStateToProps = state => ({
  loading: selectIsLoadingBarShown(state),
  hideWithError: selectIsLoadingBarWithError(state),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LoadingBar)
