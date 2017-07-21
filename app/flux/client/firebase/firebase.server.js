import * as firebase from 'firebase/firebase-node'

global.firebaseImported = firebase

export default function importFirebase() {
  if (global.firebaseImported) {
    return Promise.resolve(global.firebaseImported)
  }

  // just in case.
  return Promise.resolve((resolve, reject) => {
    resolve(require('firebase/firebase-node'))
  })
}
