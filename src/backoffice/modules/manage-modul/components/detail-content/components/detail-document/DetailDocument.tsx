import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import Loading from '@/components/loading';
import React, { useEffect, useState } from 'react';

const DetailDocument: React.FC<{
  content: APIContentChapter;
  isLoading: boolean;
}> = ({ content, isLoading }) => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    if (content.body) {
      const url = `${process.env.API_SERVER_URL}/v1/file/${content.body}`;
      setPdfUrl(url);
    }
  }, [content.body]);

  return (
    <Loading isLoading={isLoading}>
      {pdfUrl && (
        <object
          data={`${pdfUrl}#view=FitH`}
          type="application/pdf"
          className="w-full h-screen border rounded-lg"
        >
        </object>
      )}
    </Loading>
  );
};

export default DetailDocument;
