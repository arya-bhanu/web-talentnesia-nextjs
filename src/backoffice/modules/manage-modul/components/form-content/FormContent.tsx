import React, { useEffect, useState } from 'react';
import FormContentView from './FormContent.view';
import { useQuery } from '@tanstack/react-query';
import { fetchContent } from '../../api/manageModelApi';

const date = new Date();
date.setHours(1);
date.setMinutes(0);

const FormContent = ({ contentId }: { contentId?: string }) => {
  const [time, setTime] = useState(date);
  const [file, setFile] = useState<File | null>(null);
  const { data: dataContent } = useQuery({
    queryKey: ['chapter', contentId],
    queryFn: () => fetchContent(contentId),
  });
  useEffect(() => {
    if (dataContent?.data) {
      const time = dataContent.data.duration as string;
      const [hour, minute] = time.split(':');
      const date = new Date();
      date.setHours(Number(hour));
      date.setMinutes(Number(minute));
      setTime(date);
    }
  }, [dataContent?.data]);
 
  return (
    <FormContentView
      file={file}
      setFile={setFile}
      setTime={setTime}
      time={time}
      contentId={contentId}
      populatedData={dataContent?.data}
    />
  );
};

export default FormContent;
