import ga from './ga'

const DEFAULT_ANALYTICS_LIST = ['default']

export default function gaAction(action = 'send', args = {}, analytics = DEFAULT_ANALYTICS_LIST) {
  for (let i = 0; i < analytics.length; i += 1) {
    if (analytics[i] === 'default') {
      // for 'default' it's just ('send', {...})
      ga(action, args)
    } else {
      // for any other it's ('name.send', {...})
      ga(`${analytics[i]}.${action}`, args)
    }
  }
}


export function trackPage(page = '/') {
  setTimeout(() => {
    const title = typeof document !== 'undefined' ? document.title : ''
    const fullPath = GLOBALS.BASE_URL + page

    // set page data
    gaAction('set', {
      page,
      title,
    })

    // actuall pageview hit
    gaAction('send', {
      hitType: 'pageview',
      page,
      title,
      location: fullPath,
    })
  }, 10)
}
