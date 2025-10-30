// @/plugins/firebase.ts
// Firebase v9+ modular SDK for Nuxt 3
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAnalytics, type Analytics } from 'firebase/analytics'

export default defineNuxtPlugin(() => {
  const config = {
    apiKey: 'AIzaSyB9KlcGPrf8fzbUf-hCWAmFuYSOOOBinRA',
    authDomain: 'chiku-62b3f.firebaseapp.com',
    databaseURL:
      'https://chiku-62b3f-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'chiku-62b3f',
    storageBucket: 'chiku-62b3f.appspot.com',
    messagingSenderId: '798066590372',
    appId: '1:798066590372:web:076b3e8730644e4463dc31',
    measurementId: 'G-LJENY5XWF7',
  }

  // Initialize Firebase
  const app: FirebaseApp = initializeApp(config)
  
  // Initialize services
  const firestore: Firestore = getFirestore(app)
  
  // Initialize Analytics (only on client side)
  let analytics: Analytics | null = null
  if (process.client && typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app)
    } catch (error) {
      console.warn('Firebase Analytics initialization failed:', error)
    }
  }

  return {
    provide: {
      firebase: app,
      firestore,
      analytics,
      // Legacy compatibility for existing code
      fireDb: firestore,
    }
  }
})