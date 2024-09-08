import React, { useEffect, useState } from 'react';
import FormContentView from './FormContent.view';
import { useQuery } from '@tanstack/react-query';
import { fetchContent } from '../../api/formCourse.api';
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
    if (dataContent?.data?.data) {
      const time = dataContent.data.data.duration as string;
      
      if (time && typeof time === 'string' && time.includes(':')) {
        const [hour, minute] = time.split(':');
        const date = new Date();
        date.setHours(Number(hour));
        date.setMinutes(Number(minute));
        setTime(date);
      } else {
        console.error('Invalid time format:', time);
      }
    }
  }, [dataContent?.data?.data]);
  

  return (
    <FormContentView
      file={file}
      setFile={setFile}
      setTime={setTime}
      time={time}
      contentId={contentId}
      populatedData={dataContent?.data?.data}
    />
  );
};

export default FormContent;
