import React, { useState, lazy, Suspense } from 'react';
import { useTheme } from '../ThemeContext';

const ViewOnGoogleDocs = lazy(() => import('./ViewOnGoogleDocs'));

const DownloadResume = ({ screenSize }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const pdfUrl = '/resume.pdf';

  return (
    <div className="view-pdf mt-11 mb-11">
      <div className="show gap-3 flex-col flex-wrap flex sm:flex-row sm:flex-nowrap">
        <p className={`cta-text ${theme}-ctatext`}>
          My Resume <br className="sm:block hidden" />
        </p>
        {isVisible && (
          <Suspense fallback={<div>Loading...</div>}>
            <ViewOnGoogleDocs />
          </Suspense>
        )}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={isVisible ? 'btnred' : 'btn'}
        >
          {isVisible ? 'Hide Resume' : 'View Resume'}
        </button>
      </div>

      <div className="mt-5">
        {isVisible && (
          <iframe
            src={pdfUrl}
            title="Resume"
            width="100%"
            height={`${screenSize ? '400px' : '1190px'}`}
            className="mt-4 border border-blue-800 shadow-blue-600 shadow-xl"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default DownloadResume;
