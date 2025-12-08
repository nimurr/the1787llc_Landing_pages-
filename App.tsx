
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);

  // Simulates a successful checkout/login
  const handleEnterApp = () => {
    setHasAccess(true);
  };

  return (
    <>
      {hasAccess ? (
        <Dashboard />
      ) : (
        <LandingPage onEnterApp={handleEnterApp} />
      )}
    </>
  );
};

export default App;
