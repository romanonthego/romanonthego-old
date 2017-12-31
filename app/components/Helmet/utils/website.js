import composeScheme from './composeScheme'

export default function websiteSchema(website) {
  const {name, alternateName, url, searchUrl} = website

  const searchAction = {
    potentialAction: {
      '@type': 'SearchAction',
      target: `${searchUrl}={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return composeScheme('WebSite', {
    name,
    url,
    ...(alternateName ? {alternateName} : {}),
    ...(searchUrl ? searchAction : {}),
  })
}
