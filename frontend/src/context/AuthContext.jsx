// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();  // Get Firebase ID token
        
        // Send user info to backend to save in MongoDB
        try {
          const response = await axios.post("http://localhost:5000/api/users", {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          }, {
            headers: { Authorization: `Bearer ${token}` }  // Send token to backend
          });

          console.log("User saved to backend:", response.data);
        } catch (error) {
          console.error("Error saving user to backend:", error);
        }

        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
