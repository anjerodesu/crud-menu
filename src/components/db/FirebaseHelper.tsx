import { getDatabase, ref } from 'firebase/database'
import { collection } from 'firebase/firestore'
import { initializeApp, setLogLevel } from 'firebase/app'
import { getAuth, type User } from '@firebase/auth'

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
const auth = getAuth(app);

interface AuthState {
    isSignedIn: boolean
    user: User | null
}

const menuItemsKey = 'menuItems'
const menuItemsPath = (uuid: string, menuItemID : string | null = null) => {
    if (menuItemID === null) {
        return `${ menuItemsKey }/${ uuid }`
    } else {
        return `${ menuItemsKey }/${ uuid }/${ menuItemID }`
    }
}

export { db, auth }
export { menuItemsKey, menuItemsPath }
export type { AuthState }
