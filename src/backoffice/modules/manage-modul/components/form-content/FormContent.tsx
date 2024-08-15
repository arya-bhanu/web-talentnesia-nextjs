import React, { useState } from 'react';
import FormContentView from './FormContent.view';
import { useQuery } from '@tanstack/react-query';
import { fetchContent } from '../../api/manageModelApi';

const FormContent = ({ contentId }: { contentId?: string }) => {
  const [time, setTime] = useState(new Date());
  const [file, setFile] = useState<File | null>(null);
  const { data: dataContent } = useQuery({
    queryKey: ['chapter', contentId],
    queryFn: () => fetchContent(contentId),
  });
  console.log(dataContent);
  return (
    <FormContentView
      file={file}
      setFile={setFile}
      setTime={setTime}
      time={time}
      contentId={contentId}
    />
  );
};

export default FormContent;
