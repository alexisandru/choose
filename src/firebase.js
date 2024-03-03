import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC-yRI4zMivXWsB7TwbNbq6pS8qHJoff7Y",
  authDomain: "social-9aa6e.firebaseapp.com",
  projectId: "social-9aa6e",
  storageBucket: "social-9aa6e.appspot.com",
  messagingSenderId: "426444813337",
  appId: "1:426444813337:web:4d272674fdd7085cd4e688"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

