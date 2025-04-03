import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.config";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-gray-100 to-blue-100 bg-opacity-80 z-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md relative border border-gray-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">✖</button>

        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-200 via-teal-400 to-blue-600 mb-5 text-center">Signup</h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-3 rounded-lg w-full border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-3 rounded-lg w-full border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />

        <div className="relative w-full mb-4">
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

        <div className="relative w-full mb-6">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-3 rounded-lg w-full border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 text-sm text-gray-600 hover:text-gray-800"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleSignup}
          disabled={isLoading}
          className="bg-gradient-to-br from-green-200 via-teal-400 to-blue-600 text-white px-6 py-3 rounded-full w-full font-semibold shadow-md hover:scale-105 transform transition duration-300 mb-4"
        >
          {isLoading ? "Signing Up..." : "Signup"}
        </button>

        <div className="text-center mb-4">
          <Link to="/login" className="text-gray-600">
            Already have an account? <span className="text-cyan-500">Login</span>
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default Signup;