import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className='cta mt-11 mb-11'>
       <p className='cta-text'>Want to contact me? <br className='sm:block hidden'/></p>
       <Link to={'/contact'} className='btn'>
        Contact Me
       </Link>
    </section>
  )
}

export default CTA