import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800 px-8 ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto p-6 rounded-xl bg-white shadow-lg border-t-8 border-teal-500"
      >
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-800">Get in Touch with Us</h1>
        <p className="text-lg leading-relaxed mb-6">
          Reach out for any inquiries related to Alzheimer’s detection, diagnostic support, or healthcare solutions. Our expert team is here to provide you with accurate and compassionate support.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-teal-500 shadow-sm"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-teal-500 shadow-sm"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-teal-500 shadow-sm"
            required
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-2 text-white rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 shadow-md"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;
