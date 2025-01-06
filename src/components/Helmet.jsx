import React from 'react';
import { Helmet } from 'react-helmet';

const CustomHelmet = ({ title, description, image, url }) => {
  return (
    <Helmet>
      {/* Basic Title */}
      <title>{title}</title>

      {/* Open Graph Metadata */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Card Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default CustomHelmet;
