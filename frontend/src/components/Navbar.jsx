import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#0E9272] text-white p-4">
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
    </nav>
  );
};

export default Navbar;
