import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Collection from './pages/Collection';
import Scanner from './pages/Scanner';
import Admin from './pages/Admin';
import { initGA, trackPageView } from './utils/analytics';
import './App.css';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    trackPageView(location.pathname);
  }, [location]);

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
