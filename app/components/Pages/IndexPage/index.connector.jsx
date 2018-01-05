import pageRenderingProvider from 'app/components/Providers/PageRenderingProvider'
import emptyLoader from 'app/flux/loaders/empty'
import {selectAlreadyVisited} from 'app/flux/selectors/me'
import {setAlreadyVisited} from 'app/flux/actions/me'
import Page from './index'

const mapStateToProps = state => {
  return {
    loading: state.loadingBar.shown,
    alreadyVisited: selectAlreadyVisited(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAlreadyVisited: fastMode => dispatch(setAlreadyVisited(fastMode)),
  }
}

export default pageRenderingProvider(Page, {
  pageName: 'IndexPage',
  asyncLoaders: [emptyLoader],
  mapStateToProps,
  mapDispatchToProps,
})
