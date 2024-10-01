import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Loading from '@/components/loading';
import { APIContentChapterProps } from '../../detailContent.type';

const DetailImage: React.FC<{
  content: { data: APIContentChapterProps };
  isLoading: boolean;
}> = ({ content, isLoading }) => {
  const [hasValidImage, setHasValidImage] = useState(false);

  useEffect(() => {
    if (content && content.data && content.data.body) {
      const isImage = /\.(png|jpg|jpeg|gif)$/i.test(content.data.body);
      setHasValidImage(isImage);
    } else {
      setHasValidImage(false);
    }
  }, [content]);

  return (
    <Loading isLoading={isLoading}>
      {hasValidImage ? (
        <div className="flex justify-center items-center mt-8">
          <div className="relative w-full max-w-xl h-auto">
            <Image
              src={content.data.body || ''}
              alt="Content Image"
              layout="responsive"
              width={800}
              height={600}
              objectFit="contain"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 border rounded-lg">
          <p className="text-lg text-gray-600">
            {content && content.data && content.data.body
              ? 'Unsupported file type'
              : 'No image available'}
          </p>
        </div>
      )}
    </Loading>
  );
};

export default DetailImage;
