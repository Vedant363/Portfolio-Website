import React, { Suspense, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import useAlert from '../hooks/useAlert';
import { useTheme } from '../ThemeContext';

// Lazy load components
const Fox = React.lazy(() => import('../models/Fox'));
const Loader = React.lazy(() => import('../components/Loader'));
const Alert = React.lazy(() => import('../components/Alert'));
const Footer = React.lazy(() => import('../components/Footer'));
const Footerformobile = React.lazy(() => import('../components/Footerformobile'));
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { theme } = useTheme();
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
   
  const { alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = useCallback((e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFocus = useCallback(() => setCurrentAnimation('walk'), []);
  const handleBlur = useCallback(() => setCurrentAnimation('idle'), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit');

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Vedant',
          from_email: form.email,
          to_email: 'vedant.ghumade363@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        showAlert({
          show: true,
          text: 'Message sent successfully!',
          type: 'success',
        });

       setTimeout(() => {
         hideAlert();
         setCurrentAnimation('idle');   
         setForm({ name: '', email: '', message: '' });
        }, [3000]);
      })
      .catch((error) => {
        setIsLoading(false);
        setCurrentAnimation('idle');
        console.log(error);
        showAlert({
          show: true,
          text: 'Sorry! Something went wrong.',
          type: 'danger',
        });

      });
  };

  const inputClass = useMemo(() => `input ${theme}-input`, [theme]);
  const textareaClass = useMemo(() => `textarea ${theme}-textarea resize-none overflow-hidden`, [theme]);

  return (
    <div className={`fullcontainer glassmorphism ${isSmallScreen ? '' : 'pb-5'}`}>
      <section className="relative flex lg:flex-row flex-col max-container">
        {alert.show && <Alert {...alert} />}

        <div className={`formcontainer ${theme}-formcontainer flex-1 min-w-[50%] flex flex-col`}>
          <h1 className="head-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">Get In Touch</h1>

          <form ref={formRef} className="w-full flex flex-col gap-7 mt-11" onSubmit={handleSubmit}>
            <label className={`${theme === 'light' ? 'text-black-500' : 'text-white'} font-semibold`}>
              Name
              <input
                type="text"
                name="name"
                className={inputClass}
                placeholder="Enter your name"
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className={`${theme === 'light' ? 'text-black-500' : 'text-white'} font-semibold`}>
              Email
              <input
                type="email"
                name="email"
                className={inputClass}
                placeholder="Enter your Email"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className={`${theme === 'light' ? 'text-black-500' : 'text-white'} font-semibold`}>
              Your Message
              <textarea
                name="message"
                rows={4}
                className={textareaClass}
                placeholder="Enter your Message"
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ height: 'auto' }}
              />
            </label>
            <button
              type="submit"
              className="btn"
              disabled={isLoading}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className='imgcontainer lg:w-1/2 w-full lg:h-auto md:h-[34.375rem] h-[21.875rem]'>
          <Canvas
            camera={{ position: [0, 0, 5] }}
            fov={75}
            near={0.1}
            far={1000}
          >
            <directionalLight intensity={2.5} position={[0, 0, 1]} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.6, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        {isSmallScreen ? <Footerformobile /> : <Footer />}
      </Suspense>
    </div>
  );
};

export default Contact;