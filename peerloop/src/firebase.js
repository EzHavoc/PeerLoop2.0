import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAq9tLGxnwRcIaMoWiCE8jNuUETvN83-4o",
  authDomain: "peerloop01.firebaseapp.com",
  projectId: "peerloop01",
  storageBucket: "peerloop01.firebaseapp.com",
  messagingSenderId: "697572645751",
  appId: "1:697572645751:web:cae6923411b39be7741f72",
  measurementId: "G-WE4XK2GV8H",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
