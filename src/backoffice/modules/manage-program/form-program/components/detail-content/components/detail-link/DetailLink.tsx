import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { APIContentChapterProps } from '../../detailContent.type';

const DetailLink: React.FC<{ content: { data: APIContentChapterProps }}> = ({ content }) => {
  const linkURL = /^(http|https):\/\//i.test(content.data.body || '')
    ? content.data.body
    : `http://${content.data.body}`;

    console.log('Link', content.data);

  return (
      <div className="mt-4">
        <Link
          href={linkURL || ''}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Open Link in New Tab
        </Link>
      </div>
  );
};

export default DetailLink;
