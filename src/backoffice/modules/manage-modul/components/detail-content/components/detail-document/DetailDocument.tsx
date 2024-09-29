import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import Loading from '@/components/loading';
import React, { useEffect, useState } from 'react';

const DetailDocument: React.FC<{
  content: APIContentChapter;
  isLoading: boolean;
}> = ({ content, isLoading }) => {

  const [pdfNotFound, setPdfNotFound] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const imageContent = `${process.env.API_SERVER_URL}/v1/file/${content.body}`;

  useEffect(() => {
    if (content && content.body) {
      setHasContent(true);
      const isPDF = content.body.endsWith('.pdf');

      if (isPDF) {
        fetch(imageContent)
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
  }, [content, imageContent]);

  return (
    <Loading isLoading={isLoading}>
      {hasContent ? (
        content.body?.endsWith('.pdf') ? (
          pdfNotFound ? (
            <div className="w-full h-64 flex items-center justify-center bg-gray-100 border rounded-lg">
              <p className="text-lg text-gray-600">PDF file not found</p>
            </div>
          ) : (
            <embed
              src={imageContent}
              type="application/pdf"
              width="100%"
              height="600px"
              className="border rounded-lg"
            />
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
