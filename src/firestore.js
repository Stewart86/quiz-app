import "firebase/firestore"

import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyC5p5yX-2ACaG2cbnl4lzoe3MZNewuZ5Cc",
  authDomain: "quiz-app-5f6dc.firebaseapp.com",
  projectId: "quiz-app-5f6dc",
  storageBucket: "quiz-app-5f6dc.appspot.com",
  messagingSenderId: "848828948567",
  appId: "1:848828948567:web:de6356fe873e23013ec312"
};
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export { db }