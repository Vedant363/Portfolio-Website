import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;
