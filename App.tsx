import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPage from './components/ForgotPage';
import VerifyOtp from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';

const App: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const paymentAccess = false; // simulate payment

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
              <Route path="/" element={<LoginPage />} />
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

              {hasAccess ? (
                <Route path="/dashboard" element={<Dashboard />} />
              ) : (
                <Route path="/dashboard" element={<Navigate to="/" />} />
              )}

              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

        </Routes>
      </Router>
    </>
  );
};

export default App;
