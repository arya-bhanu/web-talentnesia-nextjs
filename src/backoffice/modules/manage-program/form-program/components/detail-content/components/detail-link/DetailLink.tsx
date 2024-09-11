import React from 'react';
import Link from 'next/link';
import { APIContentChapterProps } from '../../detailContent.type';

const DetailLink: React.FC<{ content: { data: APIContentChapterProps } }> = ({ content }) => {
  const linkURL = /^(http|https):\/\//i.test(content.data.body || '')
    ? content.data.body
    : `http://${content.data.body}`;

  console.log('Link', content.data);

  return (
    <div className="bg-[#323232] rounded-lg px-8 py-[100px] text-white mb-8 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-2 text-center">External Link</h1>
      <h3 className="text-md mb-10 text-center">
        Click the button below to open the link in a new tab
      </h3>

      <div className="flex space-x-4 justify-center">
        <Link
          href={linkURL || ''}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-4 py-2 rounded-md bg-[#B9BDC7] text-white hover:opacity-80">
            Open Link in New Tab
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DetailLink;
