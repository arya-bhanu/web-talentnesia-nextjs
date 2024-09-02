import React from 'react';

const PdfReader: React.FC<{ url: string }> = ({ url }) => {
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
      
      <div className="flex justify-between px-8 py-4">
        <button className="px-8 py-2 rounded-full border border-[#FFC862] text-gray-700">Previous</button>
        <button className="px-14 py-2 rounded-full bg-[#FFC862] hover:bg-[#ffb428] text-gray-700">Next</button>
      </div>
    </div>
  );
};

export default PdfReader;
