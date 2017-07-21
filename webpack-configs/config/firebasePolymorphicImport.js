import path from 'path'

export default function firebasePolymorphicImport(env = 'browser') {
  return {
    'firebasePolymorphicImport$': path.join('app', 'flux', 'client', 'firebase', `firebase.${env}.js`)
  }
}
