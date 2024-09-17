import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2"; // Import your alternative navbar component
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeProvider, useTheme } from "./ThemeContext";

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const ChatwithAI = lazy(() => import('./components/ChatwithAI'));
const Counter = lazy(() => import('./lib/Counter'));

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { theme } = useTheme();
  const location = useLocation(); 

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  const renderNavbar = () => {
    return location.pathname === '/' ? <Navbar2 /> : <Navbar />;
  };

  return (
    <main className={`${theme === 'light' ? 'bg-slate-300/20' : 'bg-black'} min-h-screen`}>
      {renderNavbar()}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chat" element={<Counter />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
