import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl mb-4">Welcome, {user?.name}</h2>
        <p className="text-xl mt-4">
          Please fill in more details to proceed with the process.
          <Link to="/PatientForm" className="text-[#0E9272] underline ml-2">Here</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
