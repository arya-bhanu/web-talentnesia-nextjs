import Loading from '@/components/loading';
import React, { useEffect, useState } from 'react';
import { APIContentChapterProps } from '../../detailContent.type';

const DetailVideo: React.FC<{
  content: { data: APIContentChapterProps };
  isLoading: boolean;
}> = ({ content, isLoading }) => {
  const getYoutubeId = (youtubeUrl: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = youtubeUrl.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const contentVideo = getYoutubeId(content.data.body || '');

  if (!contentVideo) {
    return <div>Invalid YouTube URL</div>;
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
