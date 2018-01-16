import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import companyScheme from './utils/company'
import websiteScheme from './utils/website'
import breadcrumbsScheme from './utils/breadcrumbs'
import metaOrNull, {metaWithPropertyOrNull} from './utils/metaOrNull'
import scriptTag from './utils/scriptTag'
import shareImage from './assets/share.png'

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
    image: shareImage,
    imageWidth: 1200,
    imageHeight: 630,
    url: GLOBALS.BASE_URL,
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
      url,
    } = this.props

    return (
      <Helmet defaultTitle="romanonthego">
        {title && <title>{title}</title>}
        {metaOrNull('description', description)}
        {metaOrNull('twitter:title', title)}
        {metaOrNull('twitter:description', description)}
        {metaOrNull('twitter:image', `${GLOBALS.BASE_URL}${image}`)}
        {metaOrNull('twitter:card', cardType)}
        {metaOrNull('twitter:site', siteHandler)}
        {metaOrNull('twitter:creator', creatorHandler)}
        {metaWithPropertyOrNull('og:type', website)}
        {metaWithPropertyOrNull('og:url', url)}
        {metaWithPropertyOrNull('og:title', title)}
        {metaWithPropertyOrNull('og:description', description)}
        {metaWithPropertyOrNull('og:image', `${GLOBALS.BASE_URL}${image}`)}
        {metaWithPropertyOrNull('og:image:width', imageWidth, image)}
        {metaWithPropertyOrNull('og:image:height', imageHeight, image)}
        {metaWithPropertyOrNull('og:type', openGraphType)}
        {metaWithPropertyOrNull('og:site', openGraphSiteName)}
        {metaOrNull(
          'yandex-verification',
          GLOBALS.YANDEX_VERIFICATION,
          Boolean(GLOBALS.YANDEX_VERIFICATION),
        )}
        {metaOrNull(
          'google-verification',
          '52cc9HZNEX5Gd1dc_5G3XifhHYqZ5DKH0Xffngcd3PM',
        )}
        {company && scriptTag(companyScheme(company))}
        {website && scriptTag(websiteScheme(website))}
        {breadcrumbs && scriptTag(breadcrumbsScheme(breadcrumbs))}
      </Helmet>
    )
  }
}
