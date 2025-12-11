import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAyws5J0n2f2PtWVbGnWMheubWR1z8ZF4Y",
  authDomain: "streamline-6cd2d.firebaseapp.com",
  projectId: "streamline-6cd2d",
  storageBucket: "streamline-6cd2d.firebasestorage.app",
  messagingSenderId: "558704781532",
  appId: "1:558704781532:web:3ce2d1eac7bad72ce7ec19",
  measurementId: "G-QHP7K7DRV6"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Initialize DB with Long Polling to try and fix network blocks
let dbInstance;
try {
  dbInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true, 
  });
} catch (e) {
  dbInstance = getFirestore(app);
}

export const db = dbInstance;
export default app;