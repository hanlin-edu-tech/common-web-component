import firebase from '@firebase/app'
import '@firebase/firestore'

const config = {
  apiKey: 'AIzaSyA8zxUjRzg6mxKGQlFfgUd44iXJzradGio',
  authDomain: 'entry-pre-exam-info.firebaseapp.com',
  databaseURL: 'https://entry-pre-exam-info.firebaseio.com',
  projectId: 'entry-pre-exam-info',
  storageBucket: 'entry-pre-exam-info.appspot.com',
  messagingSenderId: '800460996087'
}
firebase.initializeApp(config)

const db = firebase.firestore()
// const auth = firebase.auth()
// const storage = firebase.storage()

export {
  firebase,
  db
  // auth,
  // storage
}