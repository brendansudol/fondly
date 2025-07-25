import AsyncStorage from "@react-native-async-storage/async-storage"
import { initializeApp } from "firebase/app"
import {
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app)

export const db = getFirestore(app)
