// polymorphic firebase import.
// require/async import() with Promise wrapper
import importFirebase from 'firebasePolymorphicImport'
import initFirebase from './init'

export default function firebase(init = initFirebase) {
  return importFirebase().then(init)
}

export function emailAuthProvider() {
  return firebase((fb) => fb.auth.EmailAuthProvider)
}

export function withEmailAuthProvider(callback) {
  return importFirebase().then((fb) => callback(fb.auth.EmailAuthProvider))
}

export function withFirebase(callback) {
  return firebase().then(callback)
}

export function withAuth(callback) {
  return firebase().then(({auth}) => callback(auth))
}

export function withDatabase(callback) {
  return firebase().then(({database}) => callback(database))
}
