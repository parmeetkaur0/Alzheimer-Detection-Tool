import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#0E9272] text-white p-2 flex justify-between items-center">
      <h1 className="text-2xl">Alzheimer Detection Tool</h1>
      <button onClick={handleLogout} className="text-sm underline">
        Logout
      </button>
    </header>
  );
};

export default Header;
