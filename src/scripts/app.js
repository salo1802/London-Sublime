// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//import firebaseConfig from "../utils/firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB0HeI4ixIFKlo5cV0tIvfENCnl-yJryDc",
  authDomain: "london-sublime.firebaseapp.com",
  projectId: "london-sublime",
  storageBucket: "london-sublime.appspot.com",
  messagingSenderId: "222836674191",
  appId: "1:222836674191:web:7f2f17c122c3ba907f6afa"
  };

console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(getAuth());
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export {
    app,
    auth,
    db,
    storage
}

