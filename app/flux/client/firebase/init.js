global.firebaseInstance = null

const defaultConfig = {
  apiKey: GLOBALS.FIREBASE_API_KEY,
  authDomain: GLOBALS.FIREBASE_AUTH_DOMAIN,
  databaseURL: GLOBALS.FIREBASE_DATABASE_URL,
  projectId: GLOBALS.FIREBASE_PROJECT_ID,
  storageBucket: GLOBALS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: GLOBALS.FIREBASE_MESSAGING_SENDER_ID,
}

function getUsableInstances(app) {
  if (app && app.database && app.auth) {
    return {
      database: app.database(),
      auth: app.auth(),
    }
  }

  return Promise.reject({message: 'No firebase instances'})
}

export default function initFirebase(firebase, config = defaultConfig) {
  if (global.firebaseInstance) {
    return getUsableInstances(global.firebaseInstance)
  }

  try {
    global.firebaseInstance = firebase.initializeApp(config)
  } catch (error) {
    global.firebaseInstance = null
  }

  return getUsableInstances(global.firebaseInstance)
}
