// src/components/PopupModal.jsx
import React from "react";
import { useAuth } from "../context/authContext";

const PopupModal = ({ onClose, onProceed }) => {
    const {user} = useAuth();
  return (
    <div className="fixed inset-0 flex h-2/5 justify-center bg-opacity-50 z-50 ">
      <div className="bg-white border-gray-600 border-1 p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center">
        <h2 className="text-xl font-bold mb-4 text-[#0E9272]">
          Alzheimer Detection
        </h2>
        <h2 className="text-2xl mb-4">Welcome, {user?.displayName}</h2>
        <p className="mb-4 text-gray-700">
          To proceed with Alzheimer detection, please fill in additional patient details.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
