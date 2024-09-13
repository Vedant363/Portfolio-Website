import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../ThemeContext';

const CTA = () => {
  const { theme } = useTheme();
  return (
    <section className='cta mt-11 mb-11'>
       <p className={`cta-text ${theme}-ctatext`}>Want to contact me? <br className='sm:block hidden'/></p>
       <Link to={'/contact'} className='btn'>
        Contact
       </Link>
    </section>
  )
}

export default CTA
