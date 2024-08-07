import React, { useState } from 'react';
import FormContentView from './FormContent.view';

const FormContent = () => {
  const [time, setTime] = useState(new Date());
  const [file, setFile] = useState<File | null>(null);
  return (
    <FormContentView
      file={file}
      setFile={setFile}
      setTime={setTime}
      time={time}
    />
  );
};

export default FormContent;
