import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const [showMore, setShowMore] = useState(false);

  const handleLearnMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800 px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto p-6 rounded-lg bg-white shadow-lg border-t-8 border-teal-500"
      >
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-800">About Alzheimer Detection</h1>
        <p className="text-lg leading-relaxed mb-6">
          Our Alzheimer's Detection WebApp harnesses cutting-edge AI algorithms to analyze MRI scans, delivering accurate and early-stage predictions. By enabling timely diagnosis and treatment, we empower healthcare professionals and families to make informed decisions and improve patients’ quality of life.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
        <ul className="list-disc ml-6 mb-6">
          <li>AI-Powered MRI Scan Analysis</li>
          <li>Accurate Alzheimer’s Prediction</li>
          <li>Detailed Diagnostic Reports</li>
          <li>Personalized Care Recommendations</li>
          <li>Continuous Monitoring and Updates</li>
        </ul>
        <p className="text-lg leading-relaxed mb-6">
          With our advanced detection system, healthcare professionals can quickly identify Alzheimer’s in its early stages, enabling proactive management and better patient outcomes.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLearnMore}
          className="px-6 py-2 text-white rounded-lg bg-gradient-to-r from-blue-500 to-teal-600 shadow-md mb-4"
        >
          {showMore ? 'Show Less' : 'Learn More'}
        </motion.button>
        {showMore && (
          <div className="mt-4 text-lg leading-relaxed">
            <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
            <p className="mb-4">We prioritize accuracy, reliability, and patient care. Our AI-powered solution offers real-time analysis, ensuring timely intervention and improved outcomes. With continuous updates and personalized care recommendations, we empower healthcare professionals and caregivers to make informed decisions.</p>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>To leverage technology to detect Alzheimer’s early, providing insights and support for effective management and a better quality of life for patients and their families.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AboutUs;
