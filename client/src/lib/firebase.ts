// client/src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Yaha apna config paste karo (jo Firebase Console me mila tha)
const firebaseConfig = {
  apiKey: "AIzaSyAt6J5R1tRc8WLqHgAq6LoQ8UmEKekyu_A",
  authDomain: "courseapp-ca4ee.firebaseapp.com",
  projectId: "courseapp-ca4ee",
  storageBucket: "courseapp-ca4ee.appspot.com",  // <-- yahi sahi hai
  messagingSenderId: "638160589736",
  appId: "1:638160589736:web:2bad34a705c1837d23439d",
  measurementId: "G-RG03GGD23E"
};
const app = initializeApp(firebaseConfig);

// ✅ Firebase services export kar do jaha jaha chahiye
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
