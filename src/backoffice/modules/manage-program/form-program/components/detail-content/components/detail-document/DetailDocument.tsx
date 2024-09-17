import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import Loading from '@/components/loading';
import React, { useEffect, useState } from 'react';

const DetailDocument: React.FC<{
  content: { data: APIContentChapter };
  isLoading: boolean;
}> = ({ content, isLoading }) => {
  const isPDF = content.data.body?.endsWith('.pdf');
  const [pdfNotFound, setPdfNotFound] = useState(false);

  useEffect(() => {
    if (isPDF && content.data.body !== undefined) {
      fetch(content.data.body)
        .then(response => {
          if (!response.ok) {
            setPdfNotFound(true);
          }
        })
        .catch(() => {
          setPdfNotFound(true);
        });
    }
  }, [content.data.body, isPDF]);

  return (
    <Loading isLoading={isLoading}>
      {isPDF ? (
        pdfNotFound ? (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100 border rounded-lg">
            <p className="text-lg text-gray-600">PDF file not found</p>
          </div>
        ) : (
          <iframe
            src={content.data.body}
            className="w-full h-screen border rounded-lg"
            title="PDF Viewer"
          ></iframe>
        )
      ) : (
        <div>Unsupported file type</div>
      )}
    </Loading>
  );
};

export default DetailDocument;
