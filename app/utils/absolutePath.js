export default function absolutePath(path) {
  const base = GLOBALS.BASE_URL || ''

  return `${base}${path}`
}
