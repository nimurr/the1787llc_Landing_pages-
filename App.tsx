import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const paymentAccess = false;

  // Simulates a successful checkout/login
  const handleEnterApp = () => {
    if (!paymentAccess) {
      toast.error('Payment First for access all.');
      return
    };
    setHasAccess(true);
  };

  return (
    <>
      <Toaster />
      {hasAccess ? (
        <Dashboard />
      ) : (
        <LandingPage onEnterApp={handleEnterApp} />
      )}
    </>
  );
};

export default App;
