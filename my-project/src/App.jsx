import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import Teacher from "./pages/TeacherPage";
import Student from "./pages/StudentPage";
import ProtectedRoute from "./components/ProtectedRoute"; // We will create this below

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Navigate to="/auth" />} />
        <Route path="/signup" element={<Navigate to="/auth" />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute roleRequired="teacher">
              <Teacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute roleRequired="student">
              <Student />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: Redirect unknown routes to Landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}