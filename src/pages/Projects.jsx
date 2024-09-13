import { Link } from 'react-router-dom';
import {projects} from '../constants';
import { arrow, github } from '../assets/icons';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Projects = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        My{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Projects
        </span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          I have built a few projects that I am proud of. Here are some of them:
        </p>
      </div>

      <div className="flex flex-wrap my-20 gap-16">
        {projects.map((project, index) => (
          <div 
          className="border-2 border-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg shadow-md shadow-blue-500 p-6 lg:w-[400px] w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500 hover:cursor-default" 
          key={index}
        >        
            <div className="block-container w-12 h-12">
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={project.iconUrl}
                  alt={project.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col">
              <h4 className="text-2xl font-poppins font-semibold">
                {project.name}
              </h4>
              <p className="mt-2 text-slate-500">{project.description}</p>

              <div className="linkcontainer flex justify-between">
                {project.link ? (
                  <Link
                    to={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 inline-block"
                  >
                    <div className="mt-5 flex gap-3 items-center font-poppins hover:text-yellow-400">
                      Live Link
                      <img
                        src={arrow}
                        alt="--->"
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                  </Link>
                ) : (
                  <span className="mt-5 flex gap-3 items-center font-poppins text-slate-500"></span>
                )}
                <Link
                  to={project.githublink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-transparent mt-4">
                    <img src={github} alt="Github Link" className="w-8 h-8" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-slate-200" />

      <CTA />
      <hr className="border-slate-200" />
      <Footer />
    </section>
  );
}

export default Projects
