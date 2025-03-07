import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  
//   useEffect(() => {
//     console.log("User ID:", user?.uid);

//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/patients/${user?.uid}`, {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
//         console.log("API Response:", response.data);
//         setProfile(response.data);
//       } catch (error) {
//         console.error(error);  // Log error for debugging
//         setError("Failed to fetch profile information. Please try again.");
//       }
//     };

//     if (user?.uid) {  // Check if user ID is available
//       fetchProfile();
//     }
// }, [user?.id]);

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   if (!profile) {
//     return <p>Loading...</p>;
//   }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow p-4">
        <h2 className="text-2xl mb-4 text-[#0E9272]">Profile</h2>
        <div className="w-full max-w-lg bg-white p-6 rounded shadow-md">
          <p><strong>Full Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          {/* <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Blood Group:</strong> {profile.bloodGroup}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Contact Number:</strong> {profile.contactNumber}</p> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
