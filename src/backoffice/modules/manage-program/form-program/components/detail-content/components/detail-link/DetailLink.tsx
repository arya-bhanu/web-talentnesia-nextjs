import React from 'react';
import Link from 'next/link';
import { APIContentChapterProps } from '../../detailContent.type';
import Loading from '@/components/loading';

interface DetailLinkProps {
  content: {
    data: APIContentChapterProps;
  };
  isLoading: boolean;
}

const DetailLink: React.FC<DetailLinkProps> = ({ content, isLoading }) => {
  const linkURL = content.data.body?.startsWith('http')
    ? content.data.body
    : `http://${content.data.body}`;

  return (
    <Loading isLoading={isLoading}>
      {!isLoading && (
        <div className="bg-[#323232] rounded-lg px-8 py-[100px] text-white mb-8 flex flex-col items-center">
          <h1 className="text-xl font-bold mb-2 text-center">External Link</h1>
          <h3 className="text-md mb-10 text-center">
            Click the button below to open the link in a new tab
          </h3>

          <Link
            href={linkURL || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-[#B9BDC7] text-white hover:opacity-80 transition-opacity"
          >
            Open Link in New Tab
          </Link>
        </div>
      )}
    </Loading>
  );
};

export default DetailLink;
