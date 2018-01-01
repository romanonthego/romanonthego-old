import pageRenderingProvider from 'app/components/Providers/PageRenderingProvider'
import emptyLoader from 'app/flux/loaders/empty'
import Page from './index'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default pageRenderingProvider(Page, {
  pageName: 'PlaygroundPage',
  asyncLoaders: [emptyLoader],
  mapStateToProps,
  mapDispatchToProps,
})
