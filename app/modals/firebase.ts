// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY7v7EqSNpu4wFironHKjtGxAUmEjs38M",
  authDomain: "login-auth-3b74a.firebaseapp.com",
  projectId: "login-auth-3b74a",
  storageBucket: "login-auth-3b74a.appspot.com",
  messagingSenderId: "78462955694",
  appId: "1:78462955694:web:5d4a0885c1d538015a7d3f"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services with types
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export default app;
