import composeScheme from './composeScheme'

export default function companySchema(company) {
  const {name, url, logo, sameAs = []} = company

  return composeScheme('Organization', {
    name,
    url,
    logo,
    ...(sameAs && sameAs.length ? {sameAs} : {}),
  })
}
