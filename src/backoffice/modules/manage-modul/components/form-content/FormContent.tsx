import React, { useState, useEffect } from 'react';
import FormContentView from './FormContent.view';
import { useQuery } from '@tanstack/react-query';
import { fetchContent } from '../../api/manageModelApi';
import { getImageUrl } from '@/backoffice/modules/school/api/minioApi';
import Loading from '@/components/loading';
import { z } from 'zod';
import { useStatusModalStore } from '@/lib/store';

const FormContent: React.FC<{ contentId?: string }> = ({ contentId }) => {
  const [time, setTime] = useState(new Date(0, 0, 0, 1, 0));
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('1');
  const { openModal } = useStatusModalStore();

  const { data: dataContent, isLoading } = useQuery({
    queryKey: ['chapter', contentId],
    queryFn: () => fetchContent(contentId),
  });

  const fileSchema = z.object({
    file: z.instanceof(File),
    type: z.string(),
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

  const validateFileType = (file: File, type: string): boolean => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    switch (type) {
      case '1': // Document
        return ['pdf', 'doc', 'docx'].includes(fileExtension || '');
      case '2': // Video
        return file.type.startsWith('video/');
      case '3': // Image
        return file.type.startsWith('image/');
      default:
        return false;
    }
  };

  const handleFileChange = (
    newFileUrl: string,
    newFileName: string,
    newFileType: number,
  ) => {
    try {
      const file = new File([], newFileName);
      const validationResult = fileSchema.parse({
        file,
        type: newFileType.toString(),
      });

      if (!validateFileType(validationResult.file, validationResult.type)) {
        throw new Error('Invalid file type for the selected content type');
      }

      setFileUrl(newFileUrl);
      setFileName(newFileName);
      setFileType(newFileType.toString());
    } catch (error) {
      openModal({
        status: 'error',
        message: `Invalid file: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`,
      });
    }
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
