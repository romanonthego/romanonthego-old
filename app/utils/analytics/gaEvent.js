import gaAction from './gaAction'

const HIT_TYPE = 'event'
const DEFAULT_EVENT_LABEL = 'vector2'
const CATEGORIES = {
  EXTERNAL_LINK: 'EXTERNAL_LINK',
}

export default function gaEvent(event) {
  if (!event.eventAction) {
    return new Error('ga event must contain eventAction')
  }

  if (!CATEGORIES[event.eventCategory] && typeof console !== 'undefined') {
    console.warn(
      `there is no such eventCategory defined. ${event.eventCategory} will be used`,
    )
  }

  const eventData = {
    hitType: HIT_TYPE,
    eventCategory: CATEGORIES[event.eventCategory] || event.eventCategory,
    eventAction: event.eventAction,
    eventLabel: event.eventLabel || DEFAULT_EVENT_LABEL,
    ...(event.eventValue ? {eventValue: event.eventValue} : {}),
  }

  return gaAction('send', eventData)
}
