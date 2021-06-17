import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyB9KlcGPrf8fzbUf-hCWAmFuYSOOOBinRA',
    authDomain: 'chiku-62b3f.firebaseapp.com',
    projectId: 'chiku-62b3f',
    storageBucket: 'chiku-62b3f.appspot.com',
    messagingSenderId: '798066590372',
    appId: '1:798066590372:web:076b3e8730644e4463dc31',
    measurementId: 'G-LJENY5XWF7',
  }
  firebase.initializeApp(config)
}
const fireDb = firebase.firestore()
export { fireDb }
