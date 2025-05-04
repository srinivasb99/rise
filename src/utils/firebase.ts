import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCljiHArjPU5zMXiAp7YsGW3dfi8_QqEcU",
  authDomain: "riseonlinesolution.firebaseapp.com",
  projectId: "riseonlinesolution",
  storageBucket: "riseonlinesolution.appspot.com",
  messagingSenderId: "995277315861",
  appId: "1:995277315861:web:f2bcd00418c9478e08d31c",
  measurementId: "G-XH96YG6DMX"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firestore database instance
const db = getFirestore(app);

// Export Firebase Auth instance
const auth = getAuth(app); // Initialize Auth

export { app, db, auth }; // Export auth