// firebaseConfig.js or firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAt6J5R1tRc8WLqHgAq6LoQ8UmEKekyu_A",
  authDomain: "courseapp-ca4ee.firebaseapp.com",
  projectId: "courseapp-ca4ee",
  storageBucket: "courseapp-ca4ee.firebasestorage.app",
  messagingSenderId: "638160589736",
  appId: "1:638160589736:web:2bad34a705c1837d23439d",
  measurementId: "G-RG03GGD23E"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics };
