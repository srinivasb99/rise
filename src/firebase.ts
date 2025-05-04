// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // Keep if you use Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPPFTlvu5YSnZkDj6PlXsIJl1oN-KJYgI", // Use environment variable in production
  authDomain: "rise-e4500.firebaseapp.com",
  projectId: "rise-e4500",
  storageBucket: "rise-e4500.appspot.com", // Corrected domain
  messagingSenderId: "714077071623",
  appId: "1:714077071623:web:01dc60b620c723fb0afda2",
  measurementId: "G-5CQRH7ZP94" // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics if needed
// export const analytics = getAnalytics(app);

export default app; // Export app if needed elsewhere
