import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Loading from '@/components/loading';
import { APIContentChapterProps } from '../../detailContent.type';

const DetailImage: React.FC<{
  content: { data: APIContentChapterProps };
  isLoading: boolean;
}> = ({ content, isLoading }) => {
  const isImage = /\.(png|jpg|jpeg|gif)$/.test(content.data.body || '');

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
          />
        </div>
      </div>
    </Loading>
  );
};

export default DetailImage;
