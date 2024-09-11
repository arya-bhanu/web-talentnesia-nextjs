import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import Loading from '@/components/loading';
import React, { useEffect, useState } from 'react';

const DetailDocument: React.FC<{
  content: { data: APIContentChapter };
  isLoading: boolean;
}> = ({ content, isLoading }) => {
  const isPDF = content.data.body?.endsWith('.pdf');

  return (
    <Loading isLoading={isLoading}>
      {isPDF ? (
        <iframe
          src={content.data.body}
          className="w-full h-screen border rounded-lg"
          title="PDF Viewer"
        ></iframe>
      ) : (
        <div>Unsupported file type</div>
      )}
    </Loading>
  );
};

export default DetailDocument;
