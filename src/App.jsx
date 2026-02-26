import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Import pages
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';
import JobDetails from './pages/JobSeeker/JobDetails';
import SavedJobs from './pages/JobSeeker/SavedJobs';
import UserProfile from './pages/JobSeeker/UserProfile';
import EmployerDashBoard from './pages/Employer/EmployerDashBoard';
import JobPostingForm from './pages/Employer/JobPostingForm';
import ManageJobs from './pages/Employer/ManageJobs';
import ApplicationView from './pages/Employer/ApplicationView';
import EmployerProfilePage from './pages/Employer/EmployerProfilePage';
import ProtectedRoute from './routes/ProtectedRoute';

import Header from './components/common/Header';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[#0A1929]">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Job Seeker Routes */}
            <Route path="/find-jobs" element={
              <ProtectedRoute requiredRole="jobseeker">
                <JobSeekerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/job/:jobId" element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            } />
            <Route path="/saved-jobs" element={
              <ProtectedRoute requiredRole="jobseeker">
                <SavedJobs />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute requiredRole="jobseeker">
                <UserProfile />
              </ProtectedRoute>
            } />

            {/* Employer Routes */}
            <Route path="/employer-dashboard" element={
              <ProtectedRoute requiredRole="employer">
                <EmployerDashBoard />
              </ProtectedRoute>
            } />
            <Route path="/post-job" element={
              <ProtectedRoute requiredRole="employer">
                <JobPostingForm />
              </ProtectedRoute>
            } />
            <Route path="/manage-jobs" element={
              <ProtectedRoute requiredRole="employer">
                <ManageJobs />
              </ProtectedRoute>
            } />
            <Route path="/applicants/:jobId" element={
              <ProtectedRoute requiredRole="employer">
                <ApplicationView />
              </ProtectedRoute>
            } />
            <Route path="/company-profile" element={
              <ProtectedRoute requiredRole="employer">
                <EmployerProfilePage />
              </ProtectedRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              fontSize: "13px",
              background: '#1A2B3E',
              color: '#fff',
              border: '1px solid rgba(59, 130, 246, 0.2)',
            },
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;