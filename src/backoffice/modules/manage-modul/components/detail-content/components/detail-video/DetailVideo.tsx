import Loading from '@/components/loading';
import React, { useEffect, useState } from 'react';
import { APIContentChapterProps } from '../../detailContent.type';

const DetailVideo: React.FC<{
  content: APIContentChapterProps;
  isLoading: boolean;
}> = ({ content, isLoading }) => {
  const [videoError, setVideoError] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (content.body) {
      const url = `${process.env.API_SERVER_URL}/v1/file/${content.body}`;
      setVideoUrl(url);
    }
  }, [content.body]);

  useEffect(() => {
    if (videoUrl && isValidUrl(videoUrl)) {
      setVideoError(false);
    } else {
      setVideoError(true);
    }
  }, [videoUrl]);

  if (videoError) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 border rounded-lg">
        <p className="text-lg text-gray-600">Video tidak ditemukan atau URL tidak valid</p>
      </div>
    );
  }

  return (
    <Loading isLoading={isLoading}>
      {videoUrl && (
        <video
          src={videoUrl}
          className="w-full h-auto max-h-[100vh] border rounded-lg"
          controls
          playsInline
        >
          Browser Anda tidak mendukung tag video.
        </video>
      )}
    </Loading>
  );
};

export default DetailVideo;
