import React, { useState } from 'react';
import axios from 'axios';
import { predictImage } from '../services/api';
import PredictionResult from './PredictionResult';
import { Upload } from 'lucide-react';

const UploadMRI = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [predictionResult, setPredictionResult] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [showPrediction, setShowPrediction] = useState(false); // New State
  const [userDetail, setUserDetails] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!patientName) {
      setUploadStatus("Please enter patient name.");
      return;
    }
    if (!age) {
      setUploadStatus("Please enter patient age.");
      return;
    }
    if (!gender) {
      setUploadStatus("Please select gender");
      return;
    }
    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("mriScan", selectedFile);
    formData.append("patientName", patientName);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("symptoms", symptoms);

    setUserDetails({
      patientName: patientName,
      patientAge: age,
      patientGender: gender,
    });


    try {
      setUploadStatus("Uploading...");
      // const response = await axios.post("http://localhost:5000/api/upload", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      // localStorage.setItem("fileId", response.data.fileId);
      // setUploadStatus("Upload successful! Predicting...");
      handlePrediction(selectedFile);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  const handlePrediction = async (image) => {
    try {
      const response = await predictImage(image);
      setPredictionResult(response.prediction);
      setShowPrediction(true); // Show prediction result component
    } catch (error) {
      console.error("Prediction error:", error);
      setUploadStatus(`${error}`);
    }
  };

  // Render prediction result if available
  if (showPrediction) {
    return <PredictionResult result={predictionResult} userDetails={userDetail} />;
  }

  // Render Upload MRI form if prediction not available
  return (
    <div className="bg-gradient-to-r from-gray-100 to-blue-100 w-full">
      
      <div className="bg-white p-5 px-10 rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg mx-auto">
        <Upload className="w-12 h-12 text-cyan-500 mb-2 mx-auto" />
        <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-br from-green-200 via-teal-400 to-blue-600">
          Upload MRI Scans
        </h2>
        <p className="text-gray-600 text-center mb-4">Upload MRI scans to analyze and detect signs of Alzheimer’s.</p>
        {uploadStatus && <p className="text-red-500 text-lg mt-4 text-center">{uploadStatus}</p>}
        {uploadStatus.includes("Prediction failed") && (
          <p className="text-red-500 text-lg text-center">
            Please, Give Valid MRI Scan. <span className="text-red-500">Try again!</span>
          </p>
        )}
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="mb-3 p-3 rounded-md w-full border-gray-300 shadow-md"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mb-3 p-3 rounded-md w-full border-gray-300 shadow-md"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mb-3 p-3 rounded-md w-full border-gray-300 shadow-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          placeholder="Symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="mb-3 h-12 p-3 rounded-md w-full border-gray-300 shadow-md"
        ></textarea>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-md p-5 mb-3 ${
            dragActive ? "border-[#0E9272] bg-gray-100" : "border-gray-300"
          }`}
        >
          <p className="text-gray-500 text-center">
            Drag & drop MRI scans here or{" "}
            <label className="text-cyan-500 cursor-pointer underline">
              <input type="file" className="hidden" onChange={handleFileChange} />
              browse
            </label>
          </p>
          {selectedFile && <p className="text-cyan-500 text-center mt-2">{selectedFile.name} selected!</p>}
        </div>

        <button
          onClick={handleUpload}
          className="bg-gradient-to-br from-green-200 via-teal-400 to-blue-600 text-white px-6 py-3 rounded-full w-full font-semibold"
        >
          Upload and Predict
        </button>
     
      </div>
    </div>
  );
};

export default UploadMRI;
