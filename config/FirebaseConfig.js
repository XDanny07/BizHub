// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNhinoVbBP3UZYNT8VAmDN1QawFZJrLB4",
  authDomain: "bizhub-56c4a.firebaseapp.com",
  projectId: "bizhub-56c4a",
  storageBucket: "bizhub-56c4a.appspot.com",
  messagingSenderId: "171860449142",
  appId: "1:171860449142:web:2c62fde38f398409fc8c57",
  measurementId: "G-4XN2HTB3BH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
