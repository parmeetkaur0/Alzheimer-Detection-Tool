import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import PopupModal from "./PopupModal";  

const PatientForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [patientDetails, setPatientDetails] = useState({
    uid: user?.uid,
    fullName: "",
    gender: "",
    bloodGroup: "",
    age: "",
    address: "",
    contactNumber: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(true); // Modal visibility state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/patients", patientDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/dashboard");
      const token = localStorage.getItem("token");
      localStorage.setItem("token", token)
    } catch (error) {
      setError("Failed to save patient details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login");  
  };

  const handleProceed = () => {
    setShowModal(false); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showModal && (
        <PopupModal onClose={handleCloseModal} onProceed={handleProceed} />
      )}
      <main className={`flex flex-col items-center justify-center flex-grow p-2 ${showModal ? "opacity-20" : ""}`}>
      <h2 className="text-3xl font-bold mb-4 text-[#0E9272]">
          Alzheimer Detection
        </h2>
        <h2 className="text-2xl mb-4 text-[#0E9272]">Fill the Details</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white border-gray-400 border-1 p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={patientDetails.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gender"
              name="gender"
              value={patientDetails.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodGroup">
              Blood Group
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bloodGroup"
              type="text"
              name="bloodGroup"
              placeholder="Enter blood group"
              value={patientDetails.bloodGroup}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              name="age"
              placeholder="Enter age"
              value={patientDetails.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              name="address"
              placeholder="Enter address"
              value={patientDetails.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contactNumber"
              type="text"
              name="contactNumber"
              placeholder="Enter contact number"
              value={patientDetails.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? "bg-[#09654e]" : "bg-[#0E9272]"
            } text-white px-4 py-2 rounded w-full mb-4 transition duration-200`}
          >
            {isLoading ? "Saving..." : "Save Details"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default PatientForm;
