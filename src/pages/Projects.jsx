import { Link } from 'react-router-dom';
import { projects } from '../constants';
import { arrow, github, githublight } from '../assets/icons';
import { useTheme } from '../ThemeContext';
import { useEffect, useState, useMemo, lazy, Suspense } from 'react';
const CTA = lazy(() => import('../components/CTA'));
const Footer = lazy(() => import('../components/Footer'));
const Footerformobile = lazy(() => import('../components/Footerformobile'));

const Projects = () => {
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

  const memoizedProjects = useMemo(() => projects, []);

  return (
    <div
      className={`${theme === "light" ? "bg-slate-300/20" : "bg-black"} ${
        isSmallScreen ? "" : "pb-5"
      }`}
    >
      <section className="max-container">
        <h1 className={`head-text ${theme}-headtext`}>
          My{" "}
          <span className="blue-gradient_text font-semibold drop-shadow">
            Projects
          </span>
        </h1>

        <div
          className={`mt-5 flex flex-col gap-3 ${
            theme === "light" ? "text-slate-500" : "text-slate-100"
          }`}
        >
          <p>Here are some of the projects I have built:</p>
        </div>

        <div className="flex flex-wrap my-20 gap-16">
          {memoizedProjects.map((project, index) => (
            <div
              className="border-2 border-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg shadow-md shadow-blue-500 p-6 lg:w-[26rem] lg:h-[22.5rem] w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500 hover:cursor-default"
              key={index}
            >
              {/* icon container */}
              <div className="block-container w-12 h-12">  
                <div className={`btn-back rounded-xl ${project.theme}`} />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={project.iconUrl}
                    alt={project.name}
                    className="w-1/2 h-1/2 object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="cont mt-5 flex flex-col lg:w-[22.813rem] lg:h-[15rem] justify-between">
                <h4
                  className={`${
                    theme === "light" ? "" : "text-white"
                  } text-2xl font-poppins font-semibold`}
                >
                  {project.name}
                </h4>
                <p
                  className={`${
                    theme === "light" ? "text-slate-500" : "text-white"
                  } mt-2 `}
                >
                  {project.description}
                </p>

                <div className="linkcontainer flex justify-between items-end">
                  {project.link ? (
                    <Link
                      to={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 inline-block"
                    >
                      <div className="mt-5 flex gap-3 items-center font-poppins hover:text-red-400">
                        Live Link
                        <img
                          src={arrow}
                          alt="--->"
                          className="w-4 h-4 object-contain"
                          loading="lazy"
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
                      <img
                        src={theme === "light" ? github : githublight}
                        alt="Github Link"
                        className="w-8 h-8"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-slate-200" />
        <Suspense fallback={<div>Loading...</div>}>
          <CTA />
        </Suspense>
        <hr className="border-slate-200" />
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        {isSmallScreen ? <Footerformobile /> : <Footer />}
      </Suspense>
    </div>
  );
}

export default Projects;
