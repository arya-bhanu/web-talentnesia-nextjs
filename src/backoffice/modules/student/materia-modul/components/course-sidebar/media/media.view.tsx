import React from 'react';

const Media: React.FC<{ url: string | null }> = ({ url }) => {
  if (!url) {
    return <div>No media URL provided</div>;
  }

  const getYoutubeId = (youtubeUrl: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = youtubeUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(url);

  if (!videoId) {
    return <div className="bg-[#323232] rounded-lg px-8 py-52 text-white mb-8 flex flex-col items-center flex-grow">Invalid YouTube URL</div>;
  }

  return (
    <div className="w-full h-fit bg-[#323232] rounded-lg text-white flex flex-col items-center flex-grow">
      <div className="w-full max-w-4xl mx-auto aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Media;
