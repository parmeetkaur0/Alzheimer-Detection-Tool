import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);  // State to store JWT token

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();  
        setToken(idToken);  

        try {
          // Store user info in backend if not exists
          const response = await axios.post("http://localhost:5000/api/auth/user", {
            uid: firebaseUser.uid,
            name:firebaseUser.displayName,
            email: firebaseUser.email,
          }, {
            headers: { Authorization: `Bearer ${idToken}` } 
          });

          console.log("User saved to backend:", response.data);
        } catch (error) {
          console.error("Error saving user to backend:", error);
        }

        setUser(firebaseUser);

      } else {
        setUser(null);
        setToken(null);  
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to log out user
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setToken(null);  // Clear token on logout
  };

  return (
    <AuthContext.Provider value={{ user, logout, token }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
