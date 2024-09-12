import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { skills, proglangs, experiences } from '../constants'
import CTA from '../components/CTA';

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Vedant{" "}
        </span>
        👋🏼
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Software engineer based in India, specializing in technical education
          through hands-on learning and building application.
        </p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">Skills</h3>

        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill, index) => (
            <div className="block-container w-20 h-20">
              <div className="btn-back rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">Programming Languages</h3>

        <div className="mt-16 flex flex-wrap gap-12">
          {proglangs.map((skill, index) => (
            <div className="block-container w-20 h-20">
              <div className="btn-back rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Education</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            Software engineer based in India, specializing in technical
            education through hands-on learning and building application.
          </p>
        </div>
      </div>

      <div className="mt-12 flex">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <VerticalTimelineElement
             key={experience.company_name}
             date={experience.date}
             icon={<div className='flex justify-center items-center w-full h-full'>
              <img src={experience.icon} alt={experience.company_name} className='w-[60%] h-[60%] object-contain' />
             </div>}
             contentStyle={{
              borderBottom: '8px',
              borderStyle: 'solid',
              borderBottomColor: experience.iconBg,
              boxShadow: 'none'
             }}
             iconStyle={{background: experience.iconBg}}
            >
              <div>
                <h3 className='text-black text-xl font-poppins font-semibold'>
                  {experience.title}
                </h3>
                <p className='text-black-500 font-medium font-base' style={{margin: 0}}>
                  {experience.company_name}
                </p>
              </div>

              <ul className='my-5 list-disc ml-5 space-y-2'>

              </ul>
            </VerticalTimelineElement>
          ))}
            
        </VerticalTimeline>
      </div>

       <hr className='border-slate-200 mt-7' />
       <CTA />
    </section>
  );
}

export default About
