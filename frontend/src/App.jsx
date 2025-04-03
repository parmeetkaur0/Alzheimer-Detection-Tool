import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientForm from "./components/PatientForm";
import Profile from "./components/Profile";
import Start from "./components/Start";
import LandingPage from "./pages/LandingPage";
import PredictionResult from "./components/PredictionResult";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patientForm" element={<PatientForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/result" element={<PredictionResult />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
  
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
