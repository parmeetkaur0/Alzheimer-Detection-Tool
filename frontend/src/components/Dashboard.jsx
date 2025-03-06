import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow p-4">
        <h1 className="text-3xl mb-4 text-[#0E9272]">Alzheimer Detection Dashboard</h1>
        <section className="mb-8">
          <h2 className="text-2xl mb-2">About Alzheimer's</h2>
          <p className="text-gray-700">
            Alzheimer's disease is a progressive neurological disorder that causes brain cells to waste away (degenerate) and die. 
            Alzheimer's disease is the most common cause of dementia — a continuous decline in thinking, behavioral and social skills 
            that disrupts a person's ability to function independently.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl mb-2">Check Alzheimer's with MRI Scans</h2>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.dcm"
            className="mb-4 p-2 border rounded"
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-200">
            Upload MRI Scan
          </button>
        </section>
        <section>
          <h2 className="text-2xl mb-2">Cognitive Tests</h2>
          <p className="text-gray-700 mb-4">
            If MRI scans are not available, you can take cognitive tests to check for Alzheimer's.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200">
            Take Cognitive Test
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
