import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { sun } from '../assets/icons';
import { moon } from '../assets/icons';
import { menu } from '../assets/icons';
import { useTheme } from '../ThemeContext';
import Dropdown from './Dropdown';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };
  

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const text = isScrolled ? (isHovered ? 'Home' : 'Vedant Ghumade') : (isHovered ? 'Home' : 'VG');

  const normalWidth = isScrolled ? (isHovered ? '160px' : '160px') : (isHovered ? '80px' : '40px');

  const normalTextColor = isScrolled ? (isHovered ? 'text-black' : 'blue-gradient_text') : (isHovered ? 'text-black' : 'blue-gradient_text');

  const smallScreenText = isScrolled ? 'Vedant Ghumade' : 'VG';

  const smallScreenWidth = isScrolled ? '160px' : '40px';

  const smallScreenTextColor = isScrolled ? 'blue-gradient_text' : 'blue-gradient_text';

  const normalHeaderSize = isScrolled ? 'header-fixed' : 'header';

  const smallHeaderSize = isScrolled ? 'header-fixed-small' : 'header';

  return (
      <header className={`${isSmallScreen ? smallHeaderSize : normalHeaderSize } ${theme}-theme relative`}>
      <NavLink
        to="/"
        className={`${isScrolled ? 'h-7' : 'h-10'} ${isSmallScreen ? 'mt-1' : ''} rounded-lg bg-white flex items-center justify-center font-bold shadow-md transition-all duration-300`}
        style={{ width: isSmallScreen ? smallScreenWidth : normalWidth }} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p className={`${isSmallScreen ? smallScreenTextColor : normalTextColor }  ${isScrolled ? 'text-sm' : ''}`}>
        {isSmallScreen ? smallScreenText : text}
        </p>
      </NavLink>

      {isSmallScreen ? (
   <div className="cont flex gap-4">
    <img onClick={toggleTheme} src={theme === 'light' ? moon : sun} alt="" className={`${isScrolled ? 'mt-3.5 mb-2' : 'mt-3.5'} toggle-iconcursor-pointer bg-white h-8 w-7 rounded-lg shadow-sm shadow-blue-700`} />
  <div onClick={() => handleMenuToggle()}>
  <img src={menu} alt="Menu" className={`${isScrolled ? 'mt-4' : 'mt-4'}  h-7.9 w-7  mb-1 cursor-pointer shadow-sm shadow-blue-600`} />
  {isMenuOpen && <Dropdown />}
   </div>
   </div>
) : (
  <nav className={`flex ${isScrolled ? 'text-sm' : 'text-lg'} gap-7 font-medium`}>
    <NavLink to="/about" className={({ isActive }) => isActive ? 'blue-gradient_text' : (theme === 'light' ? 'text-black' : 'text-white')}>
      About
    </NavLink>
    <NavLink to="/projects" className={({ isActive }) => isActive ? 'blue-gradient_text' : (theme === 'light' ? 'text-black' : 'text-white')}>
      Projects
    </NavLink>
    <NavLink to="/contact" className={({ isActive }) => isActive ? 'blue-gradient_text' : (theme === 'light' ? 'text-black' : 'text-white')}>
      Contact
    </NavLink>
    <img onClick={toggleTheme} src={theme === 'light' ? moon : sun} alt="" className={`${isScrolled ? '' : 'mt-1'} toggle-icon h-5 w-5 cursor-pointer`} />
  </nav>
)}


    </header>
  );
};

export default Navbar;
