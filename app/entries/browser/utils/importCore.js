export default function importCore() {
  return import(
    /* webpackChunkName: 'core-js' */
    /* webpackMode: 'lazy' */
    'core-js'
  )
}
