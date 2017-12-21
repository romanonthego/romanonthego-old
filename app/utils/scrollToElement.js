import window from 'app/utils/window'

export default function scrollToElement(element, options = {}) {
  if (!element) {
    return
  }

  const {position = 'bottom', duration = 450, FPS = 60} = options

  const elOffsetFromTop = element.getBoundingClientRect().top
  const elHeight = element.offsetHeight
  const bodyOffsetFromTop = document.body.getBoundingClientRect().top

  let elHeightTarget

  switch (position) {
    case 'bottom':
      elHeightTarget = elHeight
      break
    case 'top':
      elHeightTarget = 0
      break
    case 'middle':
      elHeightTarget = elHeight / 2
      break
    default:
      elHeightTarget = elHeight
  }

  const target = elOffsetFromTop - bodyOffsetFromTop + elHeightTarget
  const frameTime = Math.floor(1000 / FPS)
  const frames = Math.ceil(duration / frameTime)

  const scrollPerFrame = (target - document.body.scrollTop) / frames

  let timesScrolled = 0

  window.scrollInterval = setInterval(() => {
    if (timesScrolled <= frames) {
      window.scrollBy(0, scrollPerFrame)
      timesScrolled += 1
    } else {
      clearInterval(window.scrollInterval)
    }
  }, frameTime)
}
