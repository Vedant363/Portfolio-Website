import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { sun } from '../assets/icons';
import { moon } from '../assets/icons';
import { useTheme } from '../ThemeContext';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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

  return (
      <header className={`${isScrolled ? 'header-fixed' : 'header'} ${theme}-theme`}>
      <NavLink
        to="/"
        className={`${isScrolled ? 'h-7' : 'h-10'} rounded-lg bg-white flex items-center justify-center font-bold shadow-md transition-all duration-300`}
        style={{ width: isScrolled ? (isHovered ? '160px' : '160px') : (isHovered ? '80px' : '40px') }} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p className={`${isScrolled ? (isHovered ? 'text-black' : 'blue-gradient_text') : (isHovered ? 'text-black' : 'blue-gradient_text')}  ${isScrolled ? 'text-sm' : ''}`}>
          {text}
        </p>
      </NavLink>
      <nav className={`flex ${isScrolled ? 'text-sm' : 'text-lg'} gap-7 font-medium`}>
        <NavLink to={"/about"} className={({ isActive }) => isActive ? 'blue-gradient_text' : (theme === 'light' ? 'text-black' : 'text-white')}>
          About
        </NavLink>
        <NavLink to={"/projects"} className={({ isActive }) => isActive ? 'blue-gradient_text' : (theme === 'light' ? 'text-black' : 'text-white')}>
          Projects
        </NavLink>
        <NavLink to={"/contact"} className={({ isActive }) => isActive ? 'blue-gradient_text' : (theme === 'light' ? 'text-black' : 'text-white')}>
          Contact
        </NavLink>
     
        <img onClick={()=>toggleTheme()} src={ theme === 'light' ? moon : sun } alt="" className={`${isScrolled ? '' : 'mt-1'} toggle-icon h-5 w-5  cursor-pointer`}/>
      </nav>
    </header>
  );
};

export default Navbar;
