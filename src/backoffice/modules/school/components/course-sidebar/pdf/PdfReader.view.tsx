import React from 'react';

const PdfReader: React.FC<{ url: string }> = ({ url }) => {
  const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <div className="w-full h-screen">
      <iframe
        src={googleDocsUrl}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PdfReader;
