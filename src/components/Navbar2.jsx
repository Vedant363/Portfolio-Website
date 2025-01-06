import { useState, useEffect, useMemo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { sun, moon, menu } from '../assets/icons';
import { useTheme } from '../ThemeContext';
import { lazy, Suspense } from 'react';

const Dropdown = lazy(() => import('./Dropdown'));

const Navbar2 = () => {
  const { theme, setTheme } = useTheme();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const text = useMemo(() => {
    return isScrolled ? (isHovered ? 'Home' : 'Vedant Ghumade') : (isHovered ? 'Home' : 'VG');
  }, [isScrolled, isHovered]);

  const normalWidth = useMemo(() => {
    return isScrolled ? (isHovered ? '160px' : '160px') : (isHovered ? '80px' : '40px');
  }, [isScrolled, isHovered]);

  const normalTextColor = useMemo(() => {
    if (theme === 'light') {
      return isHovered ? 'text-black' : (isScrolled ? 'blue-gradient_text' : 'blue-gradient_text');
    } else {
      return isHovered ? 'text-white' : (isScrolled ? 'blue-gradient_text' : 'blue-gradient_text');
    }
  }, [isScrolled, isHovered, theme]);

  const smallScreenText = useMemo(() => {
    return isScrolled ? 'Vedant Ghumade' : 'VG';
  }, [isScrolled]);

  const smallScreenWidth = useMemo(() => {
    return isScrolled ? '160px' : '40px';
  }, [isScrolled]);

  const smallScreenTextColor = useMemo(() => {
    return 'blue-gradient_text';
  }, []);

  const normalHeaderSize = useMemo(() => {
    return isScrolled ? 'header-fixed' : 'header';
  }, [isScrolled]);

  const smallHeaderSize = useMemo(() => {
    return isScrolled ? 'header-fixed-small' : 'header';
  }, [isScrolled]);

  return (
    <header className={`${isSmallScreen ? smallHeaderSize : normalHeaderSize} ${theme}-theme relative`}>
      <NavLink
        to="/"
        className={`${isScrolled ? 'h-7' : 'h-10'} ${isSmallScreen ? 'mt-2' : ''} rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-black-500'} flex items-center justify-center font-bold shadow-md transition-all duration-300`}
        style={{ width: isSmallScreen ? smallScreenWidth : normalWidth }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p className={`${isSmallScreen ? smallScreenTextColor : normalTextColor} ${isScrolled ? 'text-sm' : ''}`}>
          {isSmallScreen ? smallScreenText : text}
        </p>
      </NavLink>

      {isSmallScreen ? (
        <div className="cont flex gap-4">
          <img
            onClick={toggleTheme}
            src={theme === 'light' ? moon : sun}
            alt=""
            className={`${isScrolled ? 'mt-3.5 mb-2' : 'mt-3.5'} toggle-icon cursor-pointer bg-white h-8 w-7 rounded-lg shadow-sm shadow-blue-700`}
          />
          <div onClick={handleMenuToggle}>
            <img
              src={menu}
              alt="Menu"
              className={`${isScrolled ? 'mt-4' : 'mt-4'} h-7.9 w-7 mb-1 cursor-pointer shadow-sm shadow-blue-600`}
            />
            {isMenuOpen && (
              <Suspense fallback={<div>Loading...</div>}>
                <Dropdown />
              </Suspense>
            )}
          </div>
        </div>
      ) : (
        <nav className={`flex ${isScrolled ? 'text-sm' : 'text-lg'} justify-center gap-7 font-medium h-11 w-[31.25rem] ${theme === 'light' ? 'bg-white' : 'bg-black-500'} p-2 rounded-lg`}>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'blue-gradient_text' : theme === 'light' ? 'text-black' : 'text-white')}>
            About
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'blue-gradient_text' : theme === 'light' ? 'text-black' : 'text-white')}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'blue-gradient_text' : theme === 'light' ? 'text-black' : 'text-white')}>
            Contact
          </NavLink>
          <NavLink to="/chat" className={({ isActive }) => (isActive ? 'blue-gradient_text' : theme === 'light' ? 'running-gradient-text-2' : 'running-gradient-text-2')}>
            Chat with AI  
          </NavLink>
          <img
            onClick={toggleTheme}
            src={theme === 'light' ? moon : sun}
            alt=""
            className={`${isScrolled ? '' : 'mt-1'} toggle-icon h-5 w-5 cursor-pointer`}
          />
        </nav>
      )}
    </header>
  );
};

export default Navbar2;
