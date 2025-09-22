
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "studio-4348954439-4c75c",
  appId: "1:399935237992:web:37dfc560f67b747720f0dd",
  apiKey: "AIzaSyD2_tIV4q4sCsyAamp95GKG4oC0ga29lXw",
  authDomain: "studio-4348954439-4c75c.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "399935237992"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
