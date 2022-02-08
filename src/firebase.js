import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6sX9pw0FWfu2OE9ZWiAwn0TAEgwHf1ro",
  authDomain: "disney-clone-90860.firebaseapp.com",
  projectId: "disney-clone-90860",
  storageBucket: "disney-clone-90860.appspot.com",
  messagingSenderId: "463155801657",
  appId: "1:463155801657:web:70084009c814214b2ce7e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)
const provider = new GoogleAuthProvider(app);
// provider.setCustomParameters({ prompt: 'select_account' });

export { db, auth, provider, storage };