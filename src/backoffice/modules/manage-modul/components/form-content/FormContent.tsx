import React, { useState, useEffect } from 'react';
import FormContentView from './FormContent.view';
import { useQuery } from '@tanstack/react-query';
import { fetchContent } from '../../api/manageModelApi';
import { getImageUrl } from '@/backoffice/modules/school/api/minioApi';
import Loading from '@/components/loading';

const FormContent: React.FC<{ contentId?: string }> = ({ contentId }) => {
  const [time, setTime] = useState(new Date(0, 0, 0, 1, 0));
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('1');

  const { data: dataContent, isLoading } = useQuery({
    queryKey: ['chapter', contentId],
    queryFn: () => fetchContent(contentId),
  });

  useEffect(() => {
    if (dataContent?.data) {
      const [hour, minute] = (dataContent.data.duration as string).split(':');
      setTime(new Date(0, 0, 0, parseInt(hour), parseInt(minute)));
      setFileType(dataContent.data.type);
      if (dataContent.data.body && dataContent.data.fileOrigin) {
        // getImageUrl(dataContent.data.body)
        //   .then((url) => {
        setFileName(dataContent.data.fileOrigin);
        setFileUrl(dataContent.data.body);
        // })
        // .catch(console.error);
      }
    }
  }, [dataContent]);

  const handleFileChange = (
    newFileUrl: string,
    newFileName: string,
    newFileType: number,
  ) => {
    setFileUrl(newFileUrl);
    setFileName(newFileName);
    setFileType(newFileType.toString());
  };

  return (
    <Loading isLoading={isLoading}>
      <FormContentView
        time={time}
        setTime={setTime}
        fileUrl={fileUrl}
        fileName={fileName}
        fileType={fileType}
        setFileType={setFileType}
        handleFileChange={handleFileChange}
        populatedData={dataContent?.data}
      />
    </Loading>
  );
};

export default FormContent;
