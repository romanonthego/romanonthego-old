import pageRenderingProvider from 'app/components/Providers/PageRenderingProvider'
import emptyLoader from 'app/flux/loaders/empty'
import {selectFastMode} from 'app/flux/selectors/me'
import {setFastMode} from 'app/flux/actions/me'
import Page from './IndexPage'

const mapStateToProps = (state) => {
  return {
    loading: state.loadingBar,
    fastMode: selectFastMode(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFastMode: (fastMode) => dispatch(setFastMode(fastMode)),
  }
}

export default pageRenderingProvider(Page, {
  asyncLoaders: [
    emptyLoader
  ],
  mapStateToProps,
  mapDispatchToProps,
})
