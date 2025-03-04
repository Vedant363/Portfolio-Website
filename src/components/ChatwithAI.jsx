import React, { useEffect, useState, Suspense, lazy, useRef } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import { submit, copy, trash } from '../assets/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useAlert from '../hooks/useAlert';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {createRoot} from 'react-dom/client';
import Markdown from 'react-markdown';
import AnswerContainer from './AnswerContainer';

// const Markdown = lazy(() => import('react-markdown'));
const Footer = lazy(() => import('./Footer'));
const Footerformobile = lazy(() => import('./Footerformobile'));
const Loader2 = lazy(() => import('./Loader2'));
const Alert = lazy(() => import('./Alert'));

const ChatwithAI = ({ count, setCount, setDate }) => {
  const textareaRef = useRef(null);
  const { theme } = useTheme();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(""); 
  const [loadingans, setLoadingAns] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false); 
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const { alert, showAlert, hideAlert } = useAlert();
  const [currentDate, setCurrentDate] = useState(""); 

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentYear = today.getFullYear();
    const dateString = `${currentDay}${currentYear}`;
    setCurrentDate(dateString);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      const lines = textareaRef.current.value.split('\n').length;
      if (lines <= 5) {
        textareaRef.current.style.height = '0.313rem'; 
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
      }
    }
  }, [question]);

  const stripMarkdown = (text) => {
    // Remove markdown formats from text
    text = text.replace(/```[\s\S]*?```/g, (match) => match.slice(3, -3));
    text = text.replace(/\*\*`\((.*?)\)`\*\*/g, '$1');
    text = text.replace(/\*\*\((.*?)\)\*\*/g, '$1');
    text = text.replace(/\*\*`(.*?)`\*\*/g, '$1');
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');
    text = text.replace(/`(.*?)`/g, '$1');
    return text;
  };

  const onCopyText = () => {
    const plainTextAnswer = stripMarkdown(answer);
    setCopyStatus(true);        
    showAlert({
      show: true,
      text: 'Copied to clipboard!',
      type: 'success',
    });
    setTimeout(() => {
      setCopyStatus(false);
      hideAlert();
    }, 2000);
  };

  const incrementCount = async () => {
    const docRef = doc(db, 'count', import.meta.env.VITE_FIREBASE_DOCUMENT_ID);
    try {
      await updateDoc(docRef, {
        count: increment(1), 
        date: currentDate 
      });
      setCount(prevCount => prevCount + 1);
      setDate(currentDate);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      await incrementCount();
      if(count <= 20){
        await handleChange();
      }
    }
  };


  const handleDelete = () => {
    setAnswer('');
  };

  async function handleChange() {
    setLoadingAns(true);
    if(count <= 20){
      try {
        const response = await axios({
          url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY,
          method: 'POST',
          data: { "contents": [{ "parts": [{ "text": question }] }] },
          headers: { 'Content-Type': 'application/json' }
        });
        // console.log(response.data.candidates[0].content.parts[0].text);
        setAnswer(response.data.candidates[0].content.parts[0].text);
        setQuestion('');
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingAns(false);  
      }
    } 
  }

  const isScrollable = textareaRef.current && textareaRef.current.scrollHeight > textareaRef.current.clientHeight;

  return (
    <div className={`fullcontainer ${isSmallScreen ? "" : "pb-5"} `}>
      <section className="max-container flex-col">
        {alert.show && <Alert {...alert} />}
        <h1 className="running-gradient-text">Chat with AI</h1>
        <div className="messagecontainer">
          <textarea
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            value={question}
            onChange={handleQuestion}
            ref={textareaRef}
            className={`p-2.5 ${theme === "light" ? "bg-slate-300" : "bg-slate-500"} outline-none w-full resize-none cursor-text rounded-l-lg ${isScrollable ? "scroll-visible" : "scroll-hidden"}`}
          />
          <img
            onClick={async() => { await incrementCount(); await handleChange(); }}
            src={submit}
            alt="Submit"
            className={`h-11 w-11 cursor-pointer ${theme === "light" ? "bg-slate-400" : "bg-slate-600"} rounded-r-lg`}
          />
        </div>
        {loadingans ? (
          <Loader2 />
        ) : (
          answer && ( 
            <div className='relative answerfullcontainer flex-col'>
              <div className={`absolute top-[-2.813rem] right-1 flex items-center ${theme === 'light' ? 'bg-white' : 'bg-black-500'} rounded-lg overflow-hidden shadow-sm shadow-blue-500 border-2 border-blue-600`}>
                <CopyToClipboard text={stripMarkdown(answer)} onCopy={onCopyText}>
                  <button className="p-1">
                    <img src={copy} alt="Copy Text" className='h-7' />
                  </button>
                </CopyToClipboard>
                <button onClick={handleDelete} className="p-1">
                  <img src={trash} alt="Delete" className='h-7' />
                </button>
              </div>
              <AnswerContainer answer={answer} theme={theme} />
            </div>
          )
        )}
      </section>
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        {isSmallScreen ? <Footerformobile /> : <Footer />}
      </Suspense>
    </div>
  );
}

export default ChatwithAI;
