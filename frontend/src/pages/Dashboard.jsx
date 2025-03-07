import React, { useState } from "react";
import axios from "axios";
import { Upload, BrainCog } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // For showing upload status

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("mriScan", selectedFile);

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post("http://localhost:5000/api/upload", formData);
      setUploadStatus("Upload successful! Analyzing the scan...");
      console.log("Upload response:", response.data);
      // Redirect or trigger analysis here if needed
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className=" py-6">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl text-[#0E9272] font-bold mb-2">About Alzheimer's</h2>
          <p className="text-lg text-gray-600">
            Alzheimer's disease is a progressive neurological disorder that causes brain cells to degenerate and die. It is the most common cause of dementia, affecting memory, thinking, and social abilities.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 max-w-6xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200">
          <Upload className="w-12 h-12 text-[#0E9272] mb-4 mx-auto" />
          <h2 className="text-xl font-semibold mb-2 text-[#0E9272]">Upload MRI Scans</h2>
          <p className="text-gray-600 mb-4">
            Upload MRI scans to analyze and detect signs of Alzheimer’s.
          </p>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-md p-4 mb-4 ${
              dragActive ? "border-[#0E9272] bg-gray-100" : "border-gray-300"
            }`}
          >
            <p className="text-gray-500">
              Drag & drop MRI scans here or{" "}
              <label className="text-[#0E9272] cursor-pointer underline">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                browse
              </label>
            </p>
          </div>
          <button
            onClick={handleUpload}
            className="bg-[#0E9272] text-white px-4 py-2 rounded-md hover:bg-[#0C7A5E] transition"
          >
            Upload Scans
          </button>
          {uploadStatus && <p className="text-gray-600 mt-2">{uploadStatus}</p>}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-7 text-center border border-gray-200">
          <BrainCog className="w-12 h-12 text-[#0E9272] mb-4 mx-auto" />
          <h2 className="text-xl font-semibold mb-2 text-[#0E9272]">
            No MRI Scans? Take Cognitive Tests
          </h2>
          <p className="text-gray-600 mb-4">
            Cognitive tests are designed to evaluate memory, attention, language skills, and problem-solving abilities. They play a crucial role in identifying early signs of Alzheimer's disease. 
          </p>
          <button className="bg-[#0E9272] text-white px-4 py-2 rounded-md hover:bg-[#0C7A5E] transition">
            Start Tests
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
