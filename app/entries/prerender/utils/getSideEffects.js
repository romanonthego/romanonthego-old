import Helmet from 'react-helmet'
import PageMeta from 'app/components/PageMeta'

export default function getSideEffects() {
  const {
    title,
    meta,
    link,
    script,
  } = Helmet.rewind()

  const {
    status
  } = PageMeta.rewind()

  return {
    title: title.toString(),
    meta: meta.toString(),
    link: link.toString(),
    script: script.toString(),
    status,
  }
}
