import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, About, Projects, Contact } from './pages';
import Footer from "./components/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeProvider, useTheme } from "./ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
     localStorage.setItem('current_theme', theme);
  }, [theme])
  
  return (
    <main className={`${theme === 'light' ? 'bg-slate-300/20' : 'bg-black'} min-h-screen`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;