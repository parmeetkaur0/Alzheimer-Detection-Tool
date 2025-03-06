import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
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
