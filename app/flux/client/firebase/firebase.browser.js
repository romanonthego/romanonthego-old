export default function importFirebase() {
  // dynamic import, will return promise
  // magic weback comment to get meaningfull chunkname
  return import(
    /* webpackChunkName: 'firebase' */
    /* webpackMode: 'lazy' */
    'firebase/firebase-browser'
  )
}
