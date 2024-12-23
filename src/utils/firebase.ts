import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCljiHArjPU5zMXiAp7YsGW3dfi8_QqEcU",
  authDomain: "riseonlinesolution.firebaseapp.com",
  projectId: "riseonlinesolution",
  storageBucket: "riseonlinesolution.firebasestorage.app",
  messagingSenderId: "995277315861",
  appId: "1:995277315861:web:f2bcd00418c9478e08d31c",
  measurementId: "G-XH96YG6DMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);
