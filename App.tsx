import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import EditorScreen from './screens/EditorScreen';
import SettingsScreen from './screens/SettingsScreen';

const App: React.FC = () => {
  // Initialize Theme on App Load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/editor/:id" element={<EditorScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;