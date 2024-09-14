import React, { Suspense, useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';

import Fox from '../models/Fox';
import Loader from '../components/Loader';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';
import Footer from '../components/Footer';
import { useTheme } from '../ThemeContext';
import Footerformobile from '../components/Footerformobile';

const Contact = () => {
  const { theme } = useTheme();
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
   
  useEffect(() => {
   const handleResize = () => {
     setIsSmallScreen(window.innerWidth < 768);
   };

   window.addEventListener('resize', handleResize);
   return () => window.removeEventListener('resize', handleResize);
 }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

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

  return (

    <div className={`fullcontainer glassmorphism ${isSmallScreen ? '' : 'pb-5'}`}>
      <section className="relative flex lg:flex-row flex-col max-container ">
        {alert.show && <Alert {...alert} />}

        <div className={`formcontainer ${theme}-formcontainer flex-1 min-w-[50%] flex flex-col`}>
          <h1 className="head-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">Get In Touch</h1>

          <form
            ref={formRef} 
            className="w-full flex flex-col gap-7 mt-11"
            onSubmit={handleSubmit} 
          >
            <label className={`${theme === 'light' ? 'text-black-500' : 'text-white'} font-semibold`}>
              Name
              <input
                type="text"
                name="name"
                className={`input ${theme}-input`}
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
                className={`input ${theme}-input`}
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
                className={`textarea ${theme}-textarea resize-none overflow-hidden`} 
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

        <div className='imgcontainer lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
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
      {isSmallScreen ? <Footerformobile/> : <Footer />}
    </div>
  );
};

export default Contact;
