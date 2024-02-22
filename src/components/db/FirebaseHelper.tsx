import { getDatabase, ref } from 'firebase/database'
import { collection } from 'firebase/firestore'
import { initializeApp, setLogLevel } from 'firebase/app'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL as string,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app);
export { db }
