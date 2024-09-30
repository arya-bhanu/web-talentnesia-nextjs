import React, { useState, useEffect } from 'react';
import FormContentView from './FormContent.view';
import { useQuery } from '@tanstack/react-query';
import { getImageUrl } from '@/backoffice/modules/school/api/minioApi';
import { fetchContent } from '../../api/formCourse.api';
import Loading from '@/components/loading/Loading';

const FormContent: React.FC<{ contentId?: string; }> = ({
  contentId,
}) => {
  const [time, setTime] = useState(new Date(0, 0, 0, 1, 0));
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('1');

  const { data: dataContent, isLoading } = useQuery({
    queryKey: ['chapter', contentId],
    queryFn: () => fetchContent(contentId),
    enabled: !!contentId,
  });

  useEffect(() => {
    if (dataContent?.data.data) {
      setFileType(dataContent.data.data.type);
      setFileName(dataContent.data.data.body || '');
      if (dataContent.data.data.duration) {
        const [hour, minute] = dataContent.data.data.duration.split(':');
        setTime(new Date(0, 0, 0, parseInt(hour), parseInt(minute)));
      }
      if (dataContent.data.data.file) {
        getImageUrl(dataContent.data.data.file)
          .then(setFileUrl)
          .catch(console.error);
      }
    }
  }, [dataContent]);

  const handleFileChange = (newFileUrl: string, newFileName: string) => {
    setFileUrl(newFileUrl);
    setFileName(newFileName);
  };

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <FormContentView
      time={time}
      setTime={setTime}
      fileUrl={fileUrl}
      fileName={fileName}
      fileType={fileType}
      setFileType={setFileType}
      handleFileChange={handleFileChange}
      populatedData={dataContent?.data.data}
    />
  );
};

export default FormContent;
