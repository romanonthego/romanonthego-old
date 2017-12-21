import isBoolean from 'lodash/isBoolean'
import window from 'app/utils/window'

// cast boolen to `yes` or `no` string.
// eslint-disable-next-line
const yesOrNo = val => (val ? 'yes' : 'no')

export default function openPopupWindow(url, params = {}) {
  const {action = 'newTab', width = 500, height = 500, ...otherParams} = params

  if (action === 'newTab') {
    window.open(url)
  }

  if (action === 'currentTab') {
    window.location = url
  }

  if (action === 'popup') {
    const top = screen.height / 2 - height / 2
    const left = screen.width / 2 - width / 2

    const popupParams = {
      toolbar: true,
      scrollbar: true,
      resizable: true,
      top,
      left,
      width,
      height,
      ...otherParams,
    }

    // {key: true...} => "key=yes,.."
    const paramString = Object.keys(popupParams)
      .map(key => {
        const value = popupParams[key]
        const stringValue = isBoolean(value) ? yesOrNo(value) : value

        return `${key}=${stringValue}`
      })
      .join(',')

    window.open(url, '_blank', paramString)
  }
}
