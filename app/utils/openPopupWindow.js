import window from 'app/utils/window'

export default function openPopupWindow(url, {action = 'newTab', width = 500, height = 500}) {
  if (action === 'newTab') {
    window.open(url)
  }

  if (action === 'currentTab') {
    window.location = url
  }

  if (action === 'popup') {
    const winTop = (screen.height / 2) - (height / 2)
    const winLeft = (screen.width / 2) - (width / 2)

    window.open(url,
      '_blank',
      `toolbar=yes,scrollbars=yes,resizable=yes,top=${winTop},left=${winLeft},width=${width},height=${height}`
    )
  }
}
