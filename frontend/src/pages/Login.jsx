import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; 

const Login = () => {
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

        // 🌐 Send Google user data to backend
        // const idToken = await user.getIdToken();
        // await axios.post(
        //     "http://localhost:5000/api/auth/user",
        //     {
        //         uid: user.uid,
        //         email: user.email,
        //         username: user.displayName || "Google User",
        //     },
        //     {
        //         headers: { Authorization: `Bearer ${idToken}` },
        //     }
        // );

        navigate("/patientform");
    } catch (error) {
        setError(error.message);
    }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <div className="relative w-full mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button onClick={handleLogin} className="bg-[#0E9272] text-white px-4 py-2 rounded w-full mb-4 ">
          Login
        </button>
        <div className="text-center">
          <Link to="/signup" className="text-black hover:underline">Don't have an account? <span className="text-[#0E9272]">Sign up</span></Link>
        </div>
        <div className="flex items-center my-5">
      <hr className="flex-grow border-t border-gray-300" />
      <span className="px-3 text-gray-500 font-semibold">OR</span>
      <hr className="flex-grow border-t border-gray-300" />
    </div>

        
        <button onClick={handleGoogleLogin} className="bg-white text-lg text-black px-4 py-2 rounded w-full mb-4 border-gray-700 border-1">Contine with
         <img src="https://imgs.search.brave.com/SEjcAO4DhX2p9W8EVfWIz5Yt1A0IvSsEfPlaFutv69M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWRpZ2l0YWxhZ2Vu/Y3kuY29tLmF1L3dw/LWNvbnRlbnQvdXBs/b2Fkcy9nb29nbGUt/bG9nby1wbmctdHJh/bnNwYXJlbnQtYmFj/a2dyb3VuZC1sYXJn/ZS1uZXctMTAyNHgz/NDYucG5n" className="inline-block w-16 h-5 ml-1.5" />  
         </button>
        
      </div>
    </div>
  );
};

export default Login;
