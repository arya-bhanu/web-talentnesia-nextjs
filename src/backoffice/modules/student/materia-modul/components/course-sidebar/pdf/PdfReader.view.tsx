import React from 'react';

const PdfReader: React.FC<{ url: string | null }> = ({ url }) => {
  if (!url) {
    return <div className="bg-[#323232] rounded-lg px-8 py-52 text-white mb-8 flex flex-col items-center flex-grow">No PDF URL provided</div>;
  }

  const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <iframe
          src={googleDocsUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default PdfReader;
