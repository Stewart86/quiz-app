import 'firebase/auth'
import 'firebase/firestore'

import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyC5p5yX-2ACaG2cbnl4lzoe3MZNewuZ5Cc",
  authDomain: "quiz-app-5f6dc.firebaseapp.com",
  projectId: "quiz-app-5f6dc",
  storageBucket: "quiz-app-5f6dc.appspot.com",
  messagingSenderId: "848828948567",
};

firebase.initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
  console.log("testing locally -- hitting local functions and firestore emulators");
  firebase.firestore().settings({
    host: 'localhost:8080',
    ssl: false
  });
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const fieldval = firebase.firestore.FieldValue;
export default firebase;