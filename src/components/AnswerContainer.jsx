import React from 'react';
import Markdown from 'react-markdown'; 

const AnswerContainer = ({ answer, theme }) => {
  return (
    <div id='root' className="answercontainer p-4 mt-[4.688rem] h-auto w-full max-w-full overflow-x-auto border-2 border-blue-600 shadow-lg shadow-blue-500 rounded-lg">
      <div className={`markdown-container ${theme}-markdown-container w-full max-w-full overflow-x-auto ${theme === "light" ? "text-black" : "text-white"}`}>
        <Markdown>{answer}</Markdown>
      </div>
    </div>
  );
};

export default AnswerContainer;
