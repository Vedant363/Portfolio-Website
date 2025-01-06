import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2"; 
import { ThemeProvider, useTheme } from "./ThemeContext";
import CustomHelmet from './components/Helmet';  // Importing the CustomHelmet component

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
};

const AppContent = () => {
  const { theme } = useTheme();
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const hasVisitedAbout = localStorage.getItem('hasVisitedAbout') === 'true';

  useEffect(() => {
    if (location.pathname === '/' && !hasVisitedAbout) {
      navigate('/about'); 
    }
  }, [location, hasVisitedAbout, navigate]);

  useEffect(() => {
    if (location.pathname === '/about') {
      localStorage.setItem('hasVisitedAbout', 'true');
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  const renderNavbar = () => {
    return location.pathname === '/' ? <Navbar2 /> : <Navbar />;
  };

  const getMetaData = (path) => {
    switch (path) {
      case '/':
        return {
          title: "Home Page | Vedant's Portfolio",
          description: 'Welcome to the Home Page of my portfolio website! Feel free to explore.',
          image: import.meta.env.VITE_PUBLIC_URL + `/card.png`,
          url: import.meta.env.VITE_PUBLIC_URL + '/'
        };
      case '/about':
        return {
          title: "About Me | Vedant's Portfolio",
          description: 'Learn more about me and my journey.',
          image: import.meta.env.VITE_PUBLIC_URL  +  `/card.png`,
          url: import.meta.env.VITE_PUBLIC_URL + '/about'
        };
      case '/projects':
        return {
          title: "Projects | Vedant's Portfolio",
          description: 'Check out some of my projects.',
          image: import.meta.env.VITE_PUBLIC_URL  + `/card.png`,
          url: import.meta.env.VITE_PUBLIC_URL + '/projects'
        };
      case '/contact':
        return {
          title: "Contact Me | Vedant's Portfolio",
          description: 'Get in touch with me.',
          image: import.meta.env.VITE_PUBLIC_URL  + `/card.png`,
          url: import.meta.env.VITE_PUBLIC_URL + '/contact'
        };
      case '/chat':
        return {
          title: "Chat with AI | Vedant's Portfolio",
          description: 'Ask any question with our AI Interface.',
          image: import.meta.env.VITE_PUBLIC_URL  + `/card.png`,
          url: import.meta.env.VITE_PUBLIC_URL + '/chat'
        };
      default:
        return {
          title: "Vedant's Portfolio",
          description: "Hi there! This is Vedant's Portfolio Website",
          image: import.meta.env.VITE_PUBLIC_URL  + `/card.png`,
          url: import.meta.env.VITE_PUBLIC_URL + '/'
        };
    }
  };

  const metaData = getMetaData(location.pathname);

  return (
    <main className={`${theme === 'light' ? 'bg-slate-300/20' : 'bg-black'} min-h-screen`}>
      {/* Add Helmet component here with dynamic data */}
      <CustomHelmet 
        title={metaData.title} 
        description={metaData.description} 
        image={metaData.image} 
        url={metaData.url} 
      />
      
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
