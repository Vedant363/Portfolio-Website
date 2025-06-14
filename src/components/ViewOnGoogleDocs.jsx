import React from 'react';

const ViewOnGoogleDocs = () => {
  const fileId = '15B_BBsqkH-FLEqPKnw24CDX5do_GBkA6'; 
  const viewUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;

  return (
    <div className="viewongoogledocs">
      <button className='btn'>
      <a
        href={viewUrl}
        target="_blank"  
        rel="noopener noreferrer" 
      >
        View on different tab
      </a>
      </button>
    </div>
  );
};

export default ViewOnGoogleDocs;
