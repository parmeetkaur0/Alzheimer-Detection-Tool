import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/patientform");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      await axios.post(
        "http://localhost:5000/api/auth/user",
        {
          uid: user.uid,
          email: user.email,
          username: user.displayName || "Google User",
        },
        {
          headers: { Authorization: `Bearer ${idToken}` }
        }
      );
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-gray-100 to-blue-100 bg-opacity-80 z-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md relative border border-gray-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">✖</button>
        
        <h2 className="text-4xl font-bold text-transparent  bg-clip-text bg-gradient-to-br from-green-200 via-teal-400 to-blue-600 mb-5 text-center">Login</h2>
        
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-3 rounded-lg w-full border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        
        <div className="relative w-full mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg w-full border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 text-sm text-gray-600 hover:text-gray-800"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="bg-gradient-to-br from-green-200 via-teal-400 to-blue-600 text-white px-6 py-3 rounded-full w-full font-semibold shadow-md hover:scale-105 transform transition duration-300 mb-4"
        >
          Login
        </button>

        <div className="text-center mb-4">
          <Link to="/signup" className="text-gray-600">
            Don't have an account? <span className="text-cyan-500">Sign Up</span>
          </Link>
        </div>

        <div className="flex items-center mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 font-medium">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="bg-white border border-gray-300 text-lg text-black px-6 py-3 rounded-full w-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition duration-300"
        >
          <img
            src="https://imgs.search.brave.com/ZyNDsok-KqN5jBJ5XqiFz-Ja9ltWWIzEKh_m1aWyc-M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEx/L05ldy1Hb29nbGUt/TG9nby00OTd4NTAw/LmpwZw"
            alt="Google Icon"
            className="w-6 h-6"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;                