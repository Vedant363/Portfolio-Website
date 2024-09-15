import React, { useEffect, useState, lazy, Suspense, useMemo } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { skills, proglangs, education } from '../constants'
import { useTheme } from '../ThemeContext';
const CTA = lazy(() => import('../components/CTA'));
const Footer = lazy(() => import('../components/Footer'));
const Footerformobile = lazy(() => import('../components/Footerformobile'));
const DownloadResume = lazy(() => import('../components/DownloadResume'));

const About = () => {
   const { theme } = useTheme();
   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

   useEffect(() => {
    if (window.scrollY !== 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);
  
   useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const memoizedSkills = useMemo(() => skills, []);
  const memoizedProglangs = useMemo(() => proglangs, []);
  const memoizedEducation = useMemo(() => education, []);

  return (
    <div className={`${isSmallScreen ? '' : 'pb-5'}`}>
    <section className="max-container">
      <h1 className={`head-text ${theme}-headtext`}>
        Hello, I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Vedant{" "}
        </span>
        👋🏼
      </h1>

      <div className={`mt-5 flex flex-col gap-3 ${theme === 'light' ? 'text-slate-500' : 'text-slate-100' } `}>
        <p>
          Software engineer based in India, specializing in technical education
          through hands-on learning and building application.
        </p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className={`subhead-text ${theme}-subheadtext`}>Skills</h3>

        <div className="mt-16 flex flex-wrap gap-12">
          {memoizedSkills.map((skill, index) => (
            <div className={`block-container ${isSmallScreen ? 'w-[70px]' : 'w-20'}  h-20`}>
              <div className="btn-back rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className={`subhead-text ${theme}-subheadtext`}>Programming Languages</h3>

        <div className="mt-16 flex flex-wrap gap-12">
          {memoizedProglangs.map((skill, index) => (
            <div className={`block-container ${isSmallScreen ?  'w-[120px]' : 'w-20'}  h-20`}>
              <div className="btn-back rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16">
        <h3 className={`subhead-text ${theme}-subheadtext`}>About Me</h3>
      </div>

      <div className="mt-7 flex">
      <VerticalTimeline>
      {memoizedEducation.map((edu, index) => (
        <VerticalTimelineElement
          key={edu.title}
          date={edu.year}
          dateClassName={`text-${theme === 'light' ? 'black' : 'white'} text-xs`}
          contentStyle={{
            borderBottom: '8px',
            borderStyle: 'solid',
            borderBottomColor: theme === 'light' ? edu.iconBg : edu.iconBg, // Darker border color in dark theme
            boxShadow: 'none',
            background: theme === 'light' ? '' : '#32364a' // Change background based on theme
          }}
          iconStyle={{
            background: theme === 'light' ? edu.iconBg : edu.iconBg // Change icon background based on theme
          }}
        >
          <div>
            <h3 className={`text-${theme === 'light' ? 'black' : 'white'} text-xl font-poppins font-semibold`}>
              {edu.title}
            </h3>
            <h4 className={`text-${theme === 'light' ? 'black' : 'white'} font-medium font-base`} style={{ margin: 0 }}>
              {edu.name}
            </h4>
            <h6 className={`text-${theme === 'light' ? 'black' : 'white'} text-sm font-light`} style={{ margin: 0 }}>
              {edu.grade}
            </h6>
          </div>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
      </div>

       <hr className='border-slate-200 mt-7' />
       <Suspense fallback={<div>Loading...</div>}>
          <DownloadResume screenSize={isSmallScreen} />
       </Suspense>
       <hr className='border-slate-200 mt-7' />
       <Suspense fallback={<div>Loading...</div>}>
          <CTA />
       </Suspense>
       <hr className='border-slate-200 mt-7' />
    </section>
    <Suspense fallback={<div>Loading...</div>}>
        {isSmallScreen ? <Footerformobile /> : <Footer />}
    </Suspense>
    </div>
  );
}

export default About
