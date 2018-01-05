import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import companyScheme from './utils/company'
import websiteScheme from './utils/website'
import breadcrumbsScheme from './utils/breadcrumbs'
import metaOrNull from './utils/metaOrNull'
import scriptTag from './utils/scriptTag'
import share from './assets/share.png'

export default class EcompHelmet extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,

    website: PropTypes.shape({
      name: PropTypes.string.isRequired,
      alternateName: PropTypes.string,
      url: PropTypes.string.isRequired,
      searchUrl: PropTypes.string,
    }),
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      sameAs: PropTypes.arrayOf(PropTypes.string),
    }),
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
      }),
    ),

    renderOpenGraph: PropTypes.bool,
    renderTwitterCard: PropTypes.bool,
    cardType: PropTypes.string,
    siteHandler: PropTypes.string,
    creatorHandler: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    openGraphType: PropTypes.string,
    openGraphSiteName: PropTypes.string,
  }

  static defaultProps = {
    renderOpenGraph: true,
    renderTwitterCard: true,
    cardType: 'summary_large_image',
    image: share,
    imageWidth: 1200,
    imageHeight: 630,
  }

  render() {
    const {
      title,
      description,
      image,
      cardType,
      siteHandler,
      creatorHandler,
      imageWidth,
      imageHeight,
      openGraphType,
      openGraphSiteName,
      company,
      website,
      breadcrumbs,
    } = this.props

    return (
      <Helmet defaultTitle="romanonthego">
        {title && <title>{title}</title>}
        {metaOrNull('description', description)}
        {metaOrNull('twitter:title', title)}
        {metaOrNull('twitter:description', description)}
        {metaOrNull('twitter:image', image)}
        {metaOrNull('twitter:card', cardType)}
        {metaOrNull('twitter:site', siteHandler)}
        {metaOrNull('twitter:creator', creatorHandler)}
        {metaOrNull('og:title', title)}
        {metaOrNull('og:description', description)}
        {metaOrNull('og:image', image)}
        {metaOrNull('og:image:width', imageWidth, image)}
        {metaOrNull('og:image:height', imageHeight, image)}
        {metaOrNull('og:type', openGraphType)}
        {metaOrNull('og:site', openGraphSiteName)}
        {metaOrNull(
          'yandex-verification',
          GLOBALS.YANDEX_VERIFICATION,
          Boolean(GLOBALS.YANDEX_VERIFICATION),
        )}
        {company && scriptTag(companyScheme(company))}
        {website && scriptTag(websiteScheme(website))}
        {breadcrumbs && scriptTag(breadcrumbsScheme(breadcrumbs))}
      </Helmet>
    )
  }
}
