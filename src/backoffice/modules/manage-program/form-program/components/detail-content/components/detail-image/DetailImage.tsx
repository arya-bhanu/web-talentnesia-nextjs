import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Loading from '@/components/loading';
import { APIContentChapterProps } from '../../detailContent.type';

const DetailImage: React.FC<{ content: { data: APIContentChapterProps }}> = ({ content }) => {
  const [isLoading, setIsLoading] = useState(true);


  const isImage = /\.(png|jpg|jpeg|gif)$/.test(content.data.body || '');

  console.log('Image', content.data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isImage) {
    return <div>Unsupported file type</div>;
  }

  return (
    <Loading isLoading={isLoading}>
      <div className="flex justify-center items-center mt-8">
        <div className="relative w-full max-w-xl h-auto">
          <Image
            src={content.data.body || ''}
            alt="Content Image"
            layout="responsive"
            width={800}
            height={600}
            objectFit="contain"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>
      </div>
    </Loading>
  );
};

export default DetailImage;
