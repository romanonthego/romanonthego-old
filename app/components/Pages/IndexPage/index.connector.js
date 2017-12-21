import pageRenderingProvider from 'app/components/Providers/PageRenderingProvider'
import Page from './index'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default pageRenderingProvider(Page, {
  asyncLoaders: [],
  mapStateToProps,
  mapDispatchToProps,
})
