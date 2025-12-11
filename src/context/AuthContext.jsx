import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase'; // Import from the file you just created

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New: Wait for Firebase to check status

  // 1. SignUp Function
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. LogIn Function
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. LogOut Function
  const logOut = () => {
    return signOut(auth);
  };

  // 4. Global Listener (Runs once on mount)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Firebase gives us the user object automatically
      setLoading(false);    // We are done checking
    });
    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {!loading && children} {/* Don't render the app until we know who is logged in */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);