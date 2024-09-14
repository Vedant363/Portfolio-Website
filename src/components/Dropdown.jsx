// Dropdown.js
import React from 'react';
import { useTheme } from '../ThemeContext';
import { NavLink } from 'react-router-dom';

const Dropdown = ({ isScrolled }) => {
  const { theme } = useTheme();
  return (
    <div className={`absolute right-3 top mt-1 w-[120px] ${theme === 'light' ? 'bg-white' : 'bg-slate-700'} p-4 shadow-lg rounded-xl shadow-blue-600`}>
      <nav className='flex flex-col gap-3 font-semibold'>
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? 'blue-gradient_text' : (theme === 'light' ? 'text-black' : 'text-white')}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => isActive ? 'blue-gradient_text' : (theme === 'light' ? 'text-black' : 'text-white')}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? 'blue-gradient_text' : (theme === 'light' ? 'text-black' : 'text-white')}
        >
          Contact
        </NavLink>
      </nav>
    </div>
  );
};

export default Dropdown;
