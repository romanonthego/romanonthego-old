import gaAction from './gaAction'

const HIT_TYPE = 'event'
const DEFAULT_EVENT_LABEL = 'vector2'
const CATEGORIES = {
  // TODO: implement event categories
}

export default function(e) {
  if (!e.eventAction) {
    return new Error('ga event must contain eventAction')
  }

  if (!CATEGORIES[e.eventCategory] && typeof console !== 'undefined') {
    console.warn(`there is no such eventCategory defined. ${e.eventCategory} will be used`) // eslint-disable-line
  }


  const event = {
    hitType: HIT_TYPE,
    eventCategory: CATEGORIES[e.eventCategory] || e.eventCategory,
    eventAction: e.eventAction,
    eventLabel: e.eventLabel || DEFAULT_EVENT_LABEL,
    ...(e.eventValue ? {eventValue: e.eventValue} : {}),
  }

  return gaAction('send', event)
}
