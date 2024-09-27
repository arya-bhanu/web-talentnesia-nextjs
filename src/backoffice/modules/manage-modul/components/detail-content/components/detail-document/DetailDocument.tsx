import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import Loading from '@/components/loading';
import React, { useEffect, useState } from 'react';

const DetailDocument: React.FC<{
  content: { data: APIContentChapter };
  isLoading: boolean;
}> = ({ content, isLoading }) => {

  const [pdfNotFound, setPdfNotFound] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    if (content && content.data && content.data.body) {
      setHasContent(true);
      const isPDF = content.data.body.endsWith('.pdf');

      if (isPDF) {
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
    } else {
      setHasContent(false);
    }
  }, [content]);

  return (
    <Loading isLoading={isLoading}>
      {hasContent ? (
        content.data.body?.endsWith('.pdf') ? (
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
        )
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 border rounded-lg">
          <p className="text-lg text-gray-600">No content available</p>
        </div>
      )}
    </Loading>
  );
};

export default DetailDocument;
