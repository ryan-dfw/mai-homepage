import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let app: FirebaseApp | undefined
let db: Firestore | undefined

// Only initialize if the env vars are actually present. This lets the app run
// fine with local-storage-only editing before Firebase is set up, and on the
// "real" production build, which intentionally has no Firebase config at all.
if (config.apiKey && config.projectId) {
  app = initializeApp(config)
  db = getFirestore(app)
} else if (import.meta.env.DEV) {
  console.warn(
    '[firebase] VITE_FIREBASE_* env vars not set — copy edits will only be saved to this browser (localStorage), not synced.'
  )
}

export { db }
