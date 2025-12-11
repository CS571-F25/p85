// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// ADD THIS LINE BELOW:
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyws5J0n2f2PtWVbGnWMheubWR1z8ZF4Y",
  authDomain: "streamline-6cd2d.firebaseapp.com",
  projectId: "streamline-6cd2d",
  storageBucket: "streamline-6cd2d.firebasestorage.app",
  messagingSenderId: "558704781532",
  appId: "1:558704781532:web:3ce2d1eac7bad72ce7ec19",
  measurementId: "G-QHP7K7DRV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Now this will work because getAuth is imported
export const auth = getAuth(app); 

export default app;