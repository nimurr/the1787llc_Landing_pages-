import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPage from './components/ForgotPage';
import VerifyOtp from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';
import DashboardProfile from './components/DashboardProfile';
import SuccessPage from './components/SuccessPage';
import CanceledPage from './components/CanceledPage';
import FailedPage from './components/FailedPage';

const App: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [paymentAccess, setPaymentAccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setHasAccess(true);
      setPaymentAccess(true);
    }
  }, []);

  const handleEnterApp = () => {
    if (!paymentAccess) {
      toast.error('Payment First for access all.');
      return;
    }
    setHasAccess(true);
  };

  return (
    <>
      <Toaster />

      <Router>
        <Routes>

          {/* SHOW LOGIN IF PAYMENT ACCESS IS FALSE */}
          {!paymentAccess ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot" element={<ForgotPage />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              {/* Normal routes when payment is TRUE */}
              <Route path="/" element={<LandingPage onEnterApp={handleEnterApp} />} />
              <Route path="/dashboard-profile" element={<DashboardProfile />} />

              {hasAccess ? (
                <Route path="/dashboard" element={<Dashboard />} />
              ) : (
                <Route path="/dashboard" element={<Navigate to="/" />} />
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CanceledPage />} />
          <Route path="/failed" element={<FailedPage />} />

        </Routes>
      </Router>
    </>
  );
};

export default App;
