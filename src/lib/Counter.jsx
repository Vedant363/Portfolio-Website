import React from 'react'
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'; 
import { db } from './firebase';
import ChatwithAI from '../components/ChatwithAI';
import { useTheme } from '../ThemeContext';

const Counter = () => {
    const { theme } = useTheme();
    const [count, setCount] = useState(null);
    const [maxcount, setMaxCount] = useState(null);
    const [date, setDate] = useState("");
    const [currentDate, setCurrentDate] = useState(""); 
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  
    useEffect(() => {
      const today = new Date();
      const currentDay = today.getDate();
      const currentYear = today.getFullYear();
      const dateString = `${currentDay}${currentYear}`;
      setCurrentDate(dateString);
    }, []);

    useEffect(() => {
    },[count]);
  
    useEffect(() => {
      if (!currentDate) return; 
  
      const fetchData = async () => {
        const docRef = doc(db, 'count', import.meta.env.VITE_FIREBASE_DOCUMENT_ID);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCount(docSnap.data().count);
            setDate(docSnap.data().date);
            setMaxCount(docSnap.data().maxcount);
            console.log(maxcount);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error getting document:', error);
        }
      };
  
      fetchData();
    }, [currentDate]); 
    
    useEffect(() => {
      if (!date || !currentDate) return; 
  
      if (currentDate !== date) {
        const resetCount = async () => {
          const docRef = doc(db, 'count', import.meta.env.VITE_FIREBASE_DOCUMENT_ID);
          try {
            await updateDoc(docRef, {
              count: 0,
              date: currentDate 
            });
            setCount(0);
            setDate(currentDate);
          } catch (error) {
            console.error('Error resetting document:', error);
          }
        };
        resetCount();
      }
    }, [date, currentDate]); 
  
    return (
      <div>
        {count >= maxcount ? (
           <div className="flex items-center justify-center h-screen ${theme === 'light' ? 'bg-slate-200' : 'bg-black'}">
           <h1 className={`${isSmallScreen ? 'text-2sm' : 'text-2xl'} font-bold text-red-600 ${theme === 'light' ? 'bg-slate-200' : 'bg-black'} p-6 border-2 border-red-600 rounded-lg shadow-lg shadow-red-500`}>
            ☹️ Request Limit Exceeded for Today
           </h1>
         </div>
        ) : (
            <ChatwithAI 
            count={count} 
            setCount={setCount} 
            setDate={setDate}
          />
        )}
      </div>
    );
  };

export default Counter
