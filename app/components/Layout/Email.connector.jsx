import {connect} from 'react-redux'
import {selectEmailUncovered} from 'app/flux/selectors/me'
import {setEmailUncovered} from 'app/flux/actions/me'

const mapStateToProps = state => {
  return {
    emailUncovered: selectEmailUncovered(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setEmailUncovered: emailUncovered =>
      dispatch(setEmailUncovered(emailUncovered)),
  }
}

export default function connector(Component) {
  return connect(mapStateToProps, mapDispatchToProps)(Component)
}
