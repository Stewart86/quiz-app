import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/functions"

import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyC5p5yX-2ACaG2cbnl4lzoe3MZNewuZ5Cc",
  authDomain: "quiz-app-5f6dc.firebaseapp.com",
  projectId: "quiz-app-5f6dc",
  storageBucket: "quiz-app-5f6dc.appspot.com",
  messagingSenderId: "848828948567",
}

firebase.initializeApp(firebaseConfig)

export const provider = new firebase.auth.EmailAuthProvider()
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const functions = firebase.app().functions('asia-southeast2')
export const fieldval = firebase.firestore.FieldValue
export default firebase
