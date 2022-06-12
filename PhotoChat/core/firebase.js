
import firebase from 'firebase/compat/';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgy5wbJurFAOOvCWj220HHYxCQVpFmbo4",
  authDomain: "photochat-c72d6.firebaseapp.com",
  projectId: "photochat-c72d6",
  storageBucket: "photochat-c72d6.appspot.com",
  messagingSenderId: "132948138019",
  appId: "1:132948138019:web:0aa43ab8ac9685f8473996"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const store = app.storage();

export { db, auth, store };