import UploadMRI from "../components/UploadMri";
import CognitiveTesting from "../components/CognitiveExercise";
import About from "../components/About";
import Profile from "../components/Profile";
import ContactUs from "../components/Contact";
import { Upload, Brain, Menu, Info, User, Phone, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Upload MRI");
  const [isOpen, setIsOpen] = useState(true);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Function to render components based on selection
  const renderContent = () => {
    switch (activeComponent) {
      case "Upload MRI":
        return <UploadMRI />;
      case "Cognitive Testing":
        return <CognitiveTesting />;
      case "About":
        return <About />;
      case "Profile":
        return <Profile />;
      case "Contact Us":
        return <ContactUs />;
      default:
        return <UploadMRI />;
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    { name: 'Upload MRI', icon: <Upload size={20} /> },
    { name: 'Cognitive Testing', icon: <Brain size={20} /> },
    { name: 'About', icon: <Info size={20} /> },
    { name: 'Contact Us', icon: <Phone size={20} /> },
  ];

  return (
    <div>
      {/* Navbar for small devices */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
        <div onClick={() => setIsNavbarOpen(!isNavbarOpen)} className="cursor-pointer">
          <Menu size={24} />
        </div>
        <span>Dashboard</span>
      </div>

      {isNavbarOpen && (
        <div className="md:hidden bg-gray-900 text-white p-4">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setActiveComponent(item.name);
                  setIsNavbarOpen(false);
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            ))}
            <li onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer">
              <LogOut size={20} />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content for small devices */}
      <div className="md:hidden p-3 min-h-screen flex justify-center items-center  ">
        {renderContent()}
      </div>

      <div className="hidden md:flex h-auto">
        {/* Sidebar for large devices and iPads */}
        <motion.div
          animate={{ width: isOpen ? 240 : 60 }}
          className="bg-gray-900 text-white p-4 h-full fixed flex flex-col justify-between"
        >
          <div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer p-2 hover:bg-gray-700 rounded-md"
            >
              <Menu size={24} />
            </div>
            <ul className="mt-8 space-y-4">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer ${
                    activeComponent === item.name ? "bg-gray-700" : ""
                  }`}
                  onClick={() => setActiveComponent(item.name)}
                >
                  {item.icon}
                  {isOpen && <span>{item.name}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer mt-auto"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </div>
        </motion.div>

        {/* Main Content for large devices */}
       
      <div className={`flex-1 p-6 ${isOpen ? 'md:ml-[240px]' : 'md:ml-[60px]'} min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-100 to-blue-100`}>  
        {renderContent()}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
