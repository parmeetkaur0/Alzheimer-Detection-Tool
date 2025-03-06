import { useState } from "react";
import { auth , googleProvider} from "../config/firebase.config";
import { createUserWithEmailAndPassword , signInWithPopup} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const InputField = ({ type, placeholder, value, onChange }) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mb-4 p-3 border rounded w-full"
    />
);

const Signup = () => {
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
        setIsLoading(true);
        setError("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);


            navigate("/dashboard");
        } catch (error) {
            setError(error.message || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
          navigate("/dashboard");
        } catch (error) {
          setError(error.message);
        }
      };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white py-5 px-8 my-5 h-full rounded shadow-md w-full max-w-md">
                <h2 className="text-3xl font-semibold mb-6 text-center">Signup</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative w-full mb-4">
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

                <div className="relative w-full mb-4">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-3 border rounded w-full"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button
                    onClick={handleSignup}
                    disabled={isLoading}
                    className={`${isLoading ? "bg-[#156c56]" : "bg-[#0E9272]"
                        } text-white px-4 py-2 rounded w-full mb-4 transition duration-200`}
                >
                    {isLoading ? "Signing Up..." : "Signup"}
                </button>

                <div className="text-center">
                    <Link to="/login" className="text-black hover:underline">
                        Already have an account?{" "}
                        <span className="text-[#0E9272]">Login</span>
                    </Link>
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

export default Signup;
