import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#0E9272] text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold">Alzheimer Detection</span>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="underline">Home</Link>
        </li>
        <li>
          <Link to="/profile" className="underline">Profile</Link>
        </li>
        <li>
          <Link to="/PatientForm" className="underline">Patient Form</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
      <button onClick={handleLogout} className="bg-white font-semibold text-[#0A6A4E] px-4 py-2 rounded ">Logout</button>
    </nav>
  );
};

export default Navbar;
