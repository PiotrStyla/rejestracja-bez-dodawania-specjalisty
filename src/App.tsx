import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SpecialistList from './components/SpecialistList';
import Calendar from './components/Calendar';
import BookingForm from './components/BookingForm';
import SpecialistLogin from './components/SpecialistLogin';
import SpecialistDashboard from './components/SpecialistDashboard';
import SpecialistProfile from './components/SpecialistProfile';
import PublicProfile from './components/PublicProfile';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminSettings from './components/AdminSettings';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRegistration from './components/AdminRegistration';
import EmailConfirmation from './components/EmailConfirmation';

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full md:w-1/3 px-2 mb-4">
        <SpecialistList onSelect={() => {}} />
      </div>
      <div className="w-full md:w-1/3 px-2 mb-4">
        <Calendar onSelect={() => {}} />
      </div>
      <div className="w-full md:w-1/3 px-2 mb-4">
        <BookingForm specialist={null} date={null} time={null} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/specialist-login" element={<SpecialistLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-registration" element={<AdminRegistration />} />
            <Route path="/email-confirmation" element={<EmailConfirmation />} />
            <Route
              path="/specialist-dashboard"
              element={
                <ProtectedRoute allowedRoles={['specialist']}>
                  <SpecialistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/specialist-profile"
              element={
                <ProtectedRoute allowedRoles={['specialist']}>
                  <SpecialistProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/public-profile"
              element={
                <ProtectedRoute allowedRoles={['specialist']}>
                  <PublicProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-settings"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;