import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import Loading from '@/components/loading';
import React, { useEffect, useState } from 'react';

const DetailDocument: React.FC<{ content: { data: APIContentChapter } }> = ({ content }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isPDF = content.data.body?.endsWith(".pdf");
  console.log('PDF',content.data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
