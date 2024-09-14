import React from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

const InfoBox = ({ text, link, btnText }) => (
    <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>{text}</p>
      <Link to={link} className='neo-brutalism-white neo-btn'>{btnText}
      <img src={arrow} className='w-4 h-4 object-contain'/>
      </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
            Hi, I am <span className='font-semibold'>Vedant</span> 👋🏼
            <br />
            <br />
            Full Stack Developer
        </h1>
    ),
    2: (
        <InfoBox 
          text="Currently pursuing B.Tech in Computer Engineering from PCCOE."
          link='/about'
          btnText='Learn More'
        />
    ),
    3: (    
        <InfoBox 
          text="Learn about my projects and contributions"
          link='/projects'
          btnText='See Projects'
        />
    ),
    4: (
        <InfoBox 
          text="Want to contact me? Let's connect!"
          link='/contact'
          btnText='Contact Me'
        />
    )
}



const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo
