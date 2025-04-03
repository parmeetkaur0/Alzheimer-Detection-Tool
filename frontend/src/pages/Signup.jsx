import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.config";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const InputField = ({ type, placeholder, value, onChange }) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mb-4 p-3 border rounded w-full bg-transparent border-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#0E9272]"
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

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: username });

            navigate("/patientform");
        } catch (error) {
            setError(error.message || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            navigate("/patientform");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0E9272] to-[#156c56] text-white">
            <div className="bg-opacity-10 py-5 px-8 my-5 h-full rounded-lg shadow-lg w-full max-w-md backdrop-blur-lg">
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
                        className="p-3 border rounded w-full bg-transparent border-gray-400 text-white"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-[#0E9272]"
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
                        className="p-3 border rounded w-full bg-transparent border-gray-400 text-white"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-[#0E9272]"
                    >
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button
                    onClick={handleSignup}
                    disabled={isLoading}
                    className={`text-white px-4 py-2 rounded w-full mb-4 transition duration-200 ${isLoading ? "bg-[#156c56]" : "bg-[#0E9272]"}`}
                >
                    {isLoading ? "Signing Up..." : "Signup"}
                </button>

                <div className="text-center">
                    <Link to="/login" className="text-white hover:underline">
                        Already have an account? <span className="text-[#0E9272]">Login</span>
                    </Link>
                </div>

                <div className="flex items-center my-5">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="px-3 text-gray-500 font-semibold">OR</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="bg-white text-lg text-black px-4 py-2 rounded w-full mb-4 border-gray-700 border-1 flex items-center justify-center"
                >
                    Continue with
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                        className="inline-block w-5 h-5 ml-2"
                        alt="Google Logo"
                    />
                </button>
            </div>
        </div>
    );
};

export default Signup;