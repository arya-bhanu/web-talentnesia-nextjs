import Loading from '@/components/loading';
import React, { useEffect, useState } from 'react';
import { APIContentChapterProps } from '../../detailContent.type';

const DetailVideo: React.FC<{
  content: APIContentChapterProps;
  isLoading: boolean;
}> = ({ content, isLoading }) => {
  const [videoNotFound, setVideoNotFound] = useState(false);

  const getYoutubeId = (youtubeUrl: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = youtubeUrl.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const contentVideo = getYoutubeId(content.body || '');

  useEffect(() => {
    if (contentVideo && content.body !== undefined) {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${contentVideo}&format=json`)
        .then(response => {
          if (!response.ok) {
            setVideoNotFound(true);
          }
        })
        .catch(() => {
          setVideoNotFound(true);
        });
    } else {
      setVideoNotFound(true);
    }
  }, [content.body, contentVideo]);

  if (!contentVideo || videoNotFound) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 border rounded-lg">
        <p className="text-lg text-gray-600">YouTube video not found or invalid URL</p>
      </div>
    );
  }

  return (
    <Loading isLoading={isLoading}>
      <iframe
        src={`https://www.youtube.com/embed/${contentVideo}`}
        className="w-full h-[75vh] max-h-[100vh] border rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Loading>
  );
};

export default DetailVideo;
