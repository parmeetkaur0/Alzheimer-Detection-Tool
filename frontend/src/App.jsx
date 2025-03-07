import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientForm from "./components/PatientForm";
import Profile from "./components/Profile";
import Start from "./components/Start";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patientForm" element={<PatientForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
  
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
