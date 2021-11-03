import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyAUh7dLZOQUZP31o6ZJXBIhcM-dMeWnV4k',
    authDomain: 'bikycaughtitli.firebaseapp.com',
    projectId: 'bikycaughtitli',
    storageBucket: 'bikycaughtitli.appspot.com',
    messagingSenderId: '1050640892741',
    appId: '1:1050640892741:web:85ff9850063045a6e6f42c',
    measurementId: 'G-02DN50XQ6N',
  }
  firebase.initializeApp(config)
  firebase.analytics()
}
const fireDb = firebase.firestore()
export { fireDb }
