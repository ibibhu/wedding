import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyDPplegLrIp-FMNFpOTXmynfITcTDTbDqU',
    authDomain: 'mateen-sadika.firebaseapp.com',
    projectId: 'mateen-sadika',
    storageBucket: 'mateen-sadika.appspot.com',
    messagingSenderId: '1072080240467',
    appId: '1:1072080240467:web:713b08df1188fd883f2ba6',
    measurementId: 'G-XPEYKX3Q91',
  }
  firebase.initializeApp(config)
  firebase.analytics()
}
const fireDb = firebase.firestore()
export { fireDb }
